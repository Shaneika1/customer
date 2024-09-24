<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import {
        getUser,
        generateRandomNumber,
        generateOrderId,
        checkFields,
    } from "$lib/index";
    import supabase from "$lib/supabase";
    import swal from "sweetalert2";

    let lists = [];
    let item = "";
    let editing = false;
    let loading = false;
    let name = "";
    let brand = "";
    let quantity = 1;
    let section = "table";
    let subSection = "items";
    let items = [];
    let curAddress = "";

    let addresses = [];
    let selectedItems = [];

    var email: string = "";
    var firstname: string = "";
    var lastname: string = "";
    var phone: string = "";
    var address: string = "";
    var instructions: string = "";
    var day: string = "";
    var time: string = "";
    var budget: number = 0;

    let currentListId = 0;

    let user = {};

    const selectItems = (val, id) => {
        let temp = selectedItems;
        if(val == false) {
            temp.splice(id, 1)
        } else {
            temp.push(items[id])
        }
        selectedItems = temp
        console.log(selectedItems)
    }

    const loadData = async () => {
        user = await getUser(localStorage.getItem("token"));
        firstname = user.firstname;
        lastname = user.lastname;
        email = user.email;
        phone = user.phone;

        
        let data = await supabase.from("lists").select().eq("user", user.id);
        
        lists = data.data;
        selectedItems = lists.items

        //get addresses
        let data2 = await supabase
            .from("addresses")
            .select()
            .eq("user", user.id);
        addresses = data2.data;
    };

    const deleteList = async (id: number) => {
        loading = true;

        swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await supabase
                    .from("lists")
                    .delete()
                    .eq("id", id)
                    .then((res) => {
                        swal.fire("Success", "List Deleted", "success");
                    });
            }
        });

        loadData();
        loading = false;
    };

    const deleteItem = (index) => {
        let tempItems = items;
        tempItems.splice(index, 1);
        items = tempItems;
    };

    const add = () => {
        let tempItems = items;
        tempItems.push({ name: item, brand, quantity });
        items = tempItems;
        clear();
    };

    const clear = () => {
        item = "";
        brand = "";
        quantity = 1;
    };

    const clear2 = () => {
        item = "";
        brand = "";
        quantity = 1;
        time = ''
        day = ''
        time = ''
        address = ''
        budget = 0
        items = []
        selectedItems = []
    };

    const editList = (list) => {
        editing = true;
        name = list.name;
        items = list.items;
        selectedItems = list.items;
        section = "create";
        currentListId = list.id;
    };

    const makePayment = async () => {};

    const saveList = async () => {
        console.log(items)
        if (name.length > 0 && items.length > 0) {
            if (editing == false) {
                await supabase
                    .from("lists")
                    .insert({ name, items, user: user.id })
                    .then((res) => {
                        swal.fire("Success", "List has been Saved", "success");
                        section = "table";
                        clear();
                    });
            } else {
                await supabase
                    .from("lists")
                    .update({ name, items, user: user.id })
                    .eq("id", currentListId)
                    .then((res) => {
                        swal.fire("Success", "List has been Saved", "success");
                        // section = "table";
                        clear();
                    });
            }
        } else {
            swal.fire(
                "Oops",
                "Please fill in all fields and ensure your grocery list isnt empty!",
                "error",
            );
        }

        loadData();
    };

    const proceed = () => {
        if (budget > 0) {
            if (
                checkFields({
                    email,
                    firstname,
                    lastname,
                    phone,
                    address,
                    instructions,
                    day,
                    time,
                }) == true
            ) {
                subSection = "payment";
            } else {
                swal.fire(
                    "Oops",
                    "Please enter your information in all fields!",
                    "error",
                );
            }
        } else {
            swal.fire(
                "Oops",
                "Please ensure you add a budget over $0",
                "error",
            );
        }
    };

    const changeName = (value, index) => {
        let tempList = items;
        let name = value
        tempList[index].name = name
        items = tempList
        selectedItems = tempList
        console.log(tempList)
        console.log(items)
    }

    const changeBrand = (value, index) => {
        let tempList = items;
        let brand = value
        tempList[index].brand = brand
        items = tempList
        selectedItems = tempList
    }

    const changeQuantity = (value, index) => {
        let tempList = items;
        let quantity = value
        tempList[index].quantity = quantity
        items = tempList
        selectedItems = tempList
    }

    const sendEmail = async () => {
        
        if (true) {
            if (true) {
                await supabase
                    .from("emails")
                    .insert({ email: 'errandexecuter@gmail.com', type: "order", recoveryToken: null })
                    .then(async (res) => {
                   
                    });
            } else {
                swal.fire("Oops", "Please enter data in all fields", "error");
            }
        } else {
            swal.fire("Oops", "Email doesn't exist", "error");
        }
    };

    const order = async (paymentType: string) => {
        let orderId = await generateOrderId();
        if (paymentType == "bank") {
            await supabase
                .from("orders")
                .insert({
                    email,
                    firstname,
                    lastname,
                    phone,
                    address,
                    instructions,
                    day,
                    customer: user.id,
                    guest: false,
                    time,
                    budget,
                    items:selectedItems,
                    status: "Waiting for payment",
                    orderId,
                })
                .then((res) => {
                    sendEmail()
                    swal.fire(
                        "Success",
                        "Order has been placed",
                        "success",
                    ).then((res) => {
                        window.location.href = "/orderComplete";
                    });
                });
        } else {
            await supabase.from("orders").insert({
                email,
                firstname,
                lastname,
                phone,
                address,
                instructions,
                day,
                customer: user.id,
                guest: false,
                time,
                budget,
                items:selectItems,
                status: "Waiting for payment By Card",
                orderId,
            }).then(async (res) => {
                const params = new URLSearchParams();
            params.append("account_number", "2656269605");
            params.append("country_code", "JM");
            params.append("currency", "JMD");
            params.append("avs", "0");
            params.append("data", '{"a":"b"}');
            params.append("environment", "sandbox");
            params.append("fee_structure", "customer_pay");
            params.append("method", "credit_card");
            params.append("order_id", orderId.toString());
            params.append("origin", orderId.toString());
            params.append(
                "response_url",
                `https://errandexecuter.com/orderComplete`,
            );
            params.append("total", parseInt(budget.toString()).toFixed(2));

            // Make the POST request using axios with URLSearchParams
            await axios
                .post(
                    "https://jm.wipayfinancial.com/plugins/payments/request",
                    params,
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    },
                )
                .then((result) => {
                    
                    window.location.href = result.data.url;
                })
                .catch((err) => {
                    console.error(err);
                });
            });

            
        }
    };

    onMount(() => {
        loadData();
    });
</script>

{#if loading == false}
    <section class="guest-order-section bg-center bg-no-repeat">
        <div class="px-4 mx-auto text-center pt-10 lg:py-16">
            {#if subSection != "payment"}
            <h3
                class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
            >
                Your Personalized  Grocery Lists
            </h3>
            <p
                class="mb-8 text-lg text-center font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
            >
                Create and manage your customized grocery lists effortlessly
            </p>
            {/if}
        </div>
        <div class="mx-1 p-2 lg:p-10" style="">
            <div>
                {#if section == "table"}
                    <button
                        on:click={() => {
                            section = "create";
                            editing = false;
                            clear2()
                        }}
                        class=" confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >Create List</button
                    >
                {/if}

                {#if section == "create"}
                    {#if subSection != "payment"}
                    <button
                        on:click={() => (section = "table")}
                        class=" confirm-buttons mb-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >Back to lists</button
                    >
                    {/if}
                {/if}
            </div>
            {#if section == "create"}
                <div class="relative overflow-x-auto">
                    <div class="lg:grid lg:grid-cols-2 text-left lg:px-24">
                        <div class="lg:my-5 my-10">
                            {#if subSection == "items"}
                                <div class="max-w-md mx-auto">
                                    <div class="relative z-0 w-full mb-5 group">
                                        <label
                                            for="email"
                                            class="block text-gray-700 text-sm font-bold mb-2"
                                            >Enter List name</label
                                        >
                                        <input
                                            type="text"
                                            bind:value={name}
                                            name="floating_email"
                                            id="floating_email"
                                            class=" w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder=" "
                                            required
                                        />
                                    </div>

                                    <div
                                        class="relative mt-10 z-0 w-full mb-5 group"
                                    >
                                        <label
                                            for="email"
                                            class="block text-gray-700 text-sm font-bold mb-2"
                                            >Enter Item Name. Please Specify Size of Item</label
                                        >
                                        <input
                                            type="text"
                                            bind:value={item}
                                            name="floating_email"
                                            id="floating_email"
                                            class=" w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder=" "
                                            required
                                        />
                                    </div>

                                    <div class="relative z-0 w-full mb-5 group">
                                        <label
                                            for="email"
                                            class="block text-gray-700 text-sm font-bold mb-2"
                                            >Brand (Optional)</label
                                        >
                                        <input
                                            type="text"
                                            bind:value={brand}
                                            name="floating_email"
                                            id="floating_email"
                                            class=" w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder=" "
                                            required
                                        />
                                    </div>

                                    <div class="relative z-0 w-full mb-5 group">
                                        <label
                                            for="email"
                                            class="block text-gray-700 text-sm font-bold mb-2"
                                            >Quantity</label
                                        >
                                        <input
                                            type="number"
                                            bind:value={quantity}
                                            name="floating_email"
                                            id="floating_email"
                                            class=" w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder=" "
                                            required
                                        />
                                    </div>

                                    <button
                                        on:click={() => add()}
                                        class=" confirm-buttons mb-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >Add Item</button
                                    ><br />

                                    <button
                                        on:click={() => saveList()}
                                        class=" confirm-buttons mb-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >Save List</button
                                    ><br />

                                    {#if editing == true}
                                        <button
                                            on:click={() =>
                                                (subSection = "orderDetails")}
                                            style="background-color: #1391C8"
                                            class="mt-6 confirm-buttons mb-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >Create Order</button
                                        >
                                    {/if}
                                </div>
                            {/if}

                            {#if subSection == "orderDetails"}
                                <div class="lg:my-5 my-10">
                                    <div class="max-w-md mx-auto">
                                        <button
                                            on:click={() =>
                                                (subSection = "items")}
                                            class="mb-5 confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >Back</button
                                        >
                                        <div
                                            class="relative z-0 w-full mb-5 group"
                                        >
                                            <label
                                                for="email"
                                                class="block text-gray-700 text-sm font-bold mb-2"
                                                >Email</label
                                            >
                                            <input
                                                type="email"
                                                bind:value={email}
                                                name="floating_email"
                                                id="floating_email"
                                                class=" w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder=" "
                                                required
                                            />
                                        </div>

                                        <div
                                            class="grid md:grid-cols-2 md:gap-6"
                                        >
                                            <div
                                                class="relative z-0 w-full mb-5 group"
                                            >
                                                <label
                                                    for="email"
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                    >First Name</label
                                                >
                                                <input
                                                    type="text"
                                                    bind:value={firstname}
                                                    name="floating_first_name"
                                                    id="floating_first_name"
                                                    class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    placeholder=" "
                                                    required
                                                />
                                            </div>
                                            <div
                                                class="relative z-0 w-full mb-5 group"
                                            >
                                                <label
                                                    for="email"
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                    >Last Name</label
                                                >
                                                <input
                                                    bind:value={lastname}
                                                    type="text"
                                                    name="floating_first_name"
                                                    id="floating_first_name"
                                                    class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    placeholder=" "
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div
                                            class="grid md:grid-cols-2 md:gap-6"
                                        >
                                            <div
                                                class="relative z-0 w-full mb-5 group"
                                            >
                                                <label
                                                    for="email"
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                    >Phone Number</label
                                                >
                                                <input
                                                    type="text"
                                                    bind:value={phone}
                                                    name="floating_first_name"
                                                    id="floating_first_name"
                                                    class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    placeholder=" "
                                                    required
                                                />
                                            </div>
                                            <div
                                                class="relative z-0 w-full mb-5 group"
                                            >
                                                <label
                                                    for="email"
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                    >Address</label
                                                >
                                                <select class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  bind:value={address}>
                                                    <option>{#if addresses.length > 0}Select Address{/if} {#if addresses.length == 0}You have no addresses, please add an address in the address section {/if}</option>
                                                    {#each addresses as add}
                                                        <option value={add.address}>{add.address}</option>
                                                    {/each}
                                                </select>
                                                
                                            </div>
                                        </div>
                                        <div
                                            class="relative z-0 w-full mb-5 group"
                                        >
                                            <label
                                                for="email"
                                                class="block text-gray-700 text-sm font-bold mb-2"
                                                >Instructions</label
                                            >
                                            <textarea
                                                bind:value={instructions}
                                                class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div
                                            class="relative z-0 w-full mb-5 group"
                                        >
                                            <label
                                                for="email"
                                                class="block text-gray-700 text-sm font-bold mb-2"
                                                >Budget</label
                                            >
                                            <input
                                                type="number"
                                                bind:value={budget}
                                                name="floating_email"
                                                id="floating_email"
                                                class=" w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder=" "
                                                required
                                            />
                                            <small
                                                >Service charge of $5000 will be deducted from your budget</small
                                            >
                                        </div>

                                        <div
                                            class="relative z-0 w-full mb-5 group"
                                        >
                                            <label
                                                for="countries"
                                                class="block mb-2 text-sm font-medium text-gray-900"
                                                >Select Delivery Day</label
                                            >
                                            <select
                                                id="countries"
                                                bind:value={day}
                                                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="" selected
                                                    >Select Day</option
                                                >
                                                <option value="Saturday"
                                                    >Saturday</option
                                                >
                                                <option value="Sunday"
                                                    >Sunday</option
                                                >
                                            </select>
                                        </div>

                                        <div
                                            class="relative z-0 w-full mb-5 group"
                                        >
                                            <label
                                                for="countries"
                                                class="block mb-2 text-sm font-medium text-gray-900"
                                                >Select Delivery Time</label
                                            >
                                            <input
                                                type="time"
                                                bind:value={time}
                                                name="floating_first_name"
                                                id="floating_first_name"
                                                class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder=" "
                                                required
                                            />
                                        </div>

                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <button
                                                on:click={() => proceed()}
                                                class=" confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                >Proceed</button
                                            >
                                        </div>
                                    </div>
                                </div>
                            {/if}

                            {#if subSection == "payment"}
                                <div class="max-w-md mx-auto">
                                   
                                    <section
                                        class="guest-order-section bg-center bg-no-repeat"
                                    >
                                        <div class="">
                                            
                                            <!-- <button
                                            type="button"
                                            on:click={() => order("card")}
                                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                            >By Card</button
                                        > -->

                                            <p class="text-2xl font-bold mb-5">
                                                You're almost there
                                            </p>
                                            <div class="my-10">
                                                

                                                <p class="mb-2">
                                                    <span class='font-bold'>Step 1</span> - Transfer the total
                                                    budgeted amount to our
                                                    corresponding bank account
                                                    (e.g., Scotia to Scotia, JN
                                                    to JN, CIBC to CIBC) to
                                                    ensure same-day reflection. Bank Accounts will be available after you complete your order.
                                                </p>

                                                <p class="mb-2">
                                                    <span class='font-bold'>Step 2</span> - Upload the transfer screenshot on the order history page under your specific order.
                                                </p>
                                                <p class="mb-5">
                                                    <span class='font-bold'>Step 3</span> - Your personal shopper will confirm your order once the payment is verified. Please check your order History page for updates.
                                                </p>

                                                
                                                <p class="mb-5">
                                                    - Your personal shopper will
                                                    reach out to confirm your
                                                    order once the payment has
                                                    been verified.
                                                </p>

                                                <p class="mb-2 font-bold">
                                                    Refunds:
                                                </p>
                                                <p class="mb-5">
                                                    - Any remaining balance will be refunded.

                                                </p>

                                                <p class="mb-5">This ensures a smooth and efficient grocery order process.</p>

                                                
                                                <p class="mb-5 font-bold">Bank Accounts will be available after you complete your order.</p>
                                            </div>

                                            <button
                                                type="button"
                                                on:click={() => order("bank")}
                                                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                >Complete Order Process</button
                                            >

                                            <button
                                            on:click={() =>
                                                (subSection = "orderDetails")}
                                            class="mb-5 confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >Back</button
                                        >

                                            <!-- <button
                                                type="button"
                                                on:click={() => order("card")}
                                                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                >By Card</button
                                            > -->
                                        </div>
                                    </section>
                                </div>
                            {/if}
                        </div>

                        <div class='w-full overflow-x-scroll'>
                            
                            <p class='my-1 font-bold'></p>
                            <p class='my-1 font-bold text-lg'>Your Finalized Grocery List</p>
                            {#if subSection != 'payment'}<p class='my-1 font-bold'>Click on an item on the table to edit</p>{/if}
                            <table class="">
                                <thead class="">
                                    <tr>
                                        <th scope="col">  </th>
                                        <th scope="col"> Name </th>

                                        <th> Brand </th>

                                        <th> Quantity </th>

                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each items as item, index}
                                        <tr class="bg-white border-b">
                                            <td
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            <input type='checkbox' checked on:change={(e) => selectItems(e.target.checked, index)} />
                                        </td>
                                            <td
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                             <input value={item.name.charAt(0).toUpperCase() + item.name.slice(1) } style='border:none; background:none;' on:change={(e) => changeName(e.target.value, index)} />
                                            </td>
                                            <td
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                            <input value={item.brand.charAt(0).toUpperCase() + item.brand.slice(1) } style='border:none;  background:none;' on:change={(e) => changeBrand(e.target.value, index)} />
                                            </td>
                                            <td
                                                class="px-6 py-4 font-medium text-gray-900"
                                            >
                                            <input type='number' value={item.quantity} style='border:none;  background:none;' on:change={(e) => changeQuantity(e.target.value, index)} />
                                            </td>
                                            <td
                                                on:click={() =>
                                                    deleteItem(index)}
                                                style="cursor:pointer"
                                                class="px-6 py-4 text-red-500 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                Delete
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            {/if}

            {#if section == "table"}
                <div class="lg:grid lg:grid-cols-4">
                    {#each lists as list}
                        <div
                            class="my-10 lg:mx-5 cards border border-gray-300 bg-dark rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-gray-200"
                        >
                            <div class="p-4">
                                <!-- Card content goes here -->
                                <h2 class="text-2xl font-semibold mb-2">
                                    {list.name}
                                </h2>
                                <p class="text-gray-600">
                                    <span class="font-bold"
                                        >Number of items:</span
                                    >
                                    {list.items.length}
                                </p>

                                <button
                                    on:click={() => deleteList(list.id)}
                                    style="
            background-color: red;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial,
                sans-serif;
            "
                                    class="head lg:mr-1 mt-5 animate-slide-element-reverse border text-white hover:text-white py-2 px-4 transition duration-300 ease-in-out"
                                >
                                    <svg
                                        class="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>

                                <button
                                    on:click={() => editList(list)}
                                    style="
            background-color: #48c4c2;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial,
                sans-serif;
            "
                                    class="head lg:mr-1 mt-5 animate-slide-element-reverse border text-white hover:text-white py-2 px-4 transition duration-300 ease-in-out"
                                >
                                    <svg
                                        class="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-width="2"
                                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                        />
                                        <path
                                            stroke="currentColor"
                                            stroke-width="2"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>

        <div class='mt-40 p-40'>

        </div>
    </section>
{/if}

{#if loading == true}
    <div class="text-center">
        <div role="status">
            <svg
                aria-hidden="true"
                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
{/if}
