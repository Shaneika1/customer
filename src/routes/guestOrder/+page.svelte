<script lang="ts">
    import { checkFields } from "$lib";
    import swal from "sweetalert2";
    import supabase from "../../lib/supabase.ts";
    import axios from "axios";
    import { generateRandomNumber, generateOrderId } from "../../lib/index.js";

    var newItem: string = "";
    var quantity: number = 1;
    var brand: string = "";

    var section: string = "order";

    var email: string = "";
    var firstname: string = "";
    var lastname: string = "";
    var phone: string = "";
    var address: string = "";
    var instructions: string = "";
    var day: string = "";
    var time: string = "";
    var budget: number = 0;

    var items: Object[] = [];

    const addItem = () => {
        if (checkFields({ newItem, brand }) == true && quantity > 0) {
            let tempItems: Object[] = items;
            tempItems.push({ product: newItem, quantity, brand });
            newItem = "";
            quantity = 1;
            brand = "";
            items = tempItems;
        } else {
            swal.fire(
                "Oops",
                "Please enter your information about product",
                "error",
            );
        }
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
                section = "payment";
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
                    time,
                    budget,
                    items,
                    status: "Waiting for payment",
                    orderId,
                })
                .then((res) => {
                    swal.fire("Success", "Order has been placed", "success").then(res => {
                        window.location.href = '/guestSuccess'
                    });
                   
                });
        } else {
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
            params.append("total", budget.toString());

            axios
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
                    console.log(result.data.url);
                    window.location.href = result.data.url;
                });
        }
    };
</script>

{#if section == "order"}
    <section class="guest-order-section bg-center bg-no-repeat">
        <div class="px-4 mx-auto text-center py-24 lg:py-16">
            <h1
                class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
            >
                Place your order
            </h1>
            <p
                class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
            >
                Created a list of the items you'd like to add then type in your
                address. Please specify the brand of the products you want to
                add as well as how many.
            </p>

            <div class="lg:grid lg:grid-cols-2 text-left px-24">
                <div class="lg:my-5 my-10">
                    <div class="mb-4 w-50">
                        <label
                            for="email"
                            class="block text-gray-700 text-sm font-bold mb-2"
                            >Enter new item</label
                        >
                        <input
                            type="text"
                            id="email"
                            bind:value={newItem}
                            class="lg:w-1/2 w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div class="mb-4 w-50">
                        <label
                            for="email"
                            class="block text-gray-700 text-sm font-bold mb-2"
                            >Brand</label
                        >
                        <input
                            type="text"
                            id="email"
                            bind:value={brand}
                            class="lg:w-1/2 w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div class="mb-4 w-50">
                        <label
                            for="email"
                            class="block text-gray-700 text-sm font-bold mb-2"
                            >Quantity</label
                        >
                        <input
                            type="number"
                            id="email"
                            bind:value={quantity}
                            class="lg:w-20 w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div class="flex items-center justify-between">
                        <button
                            on:click={() => addItem()}
                            class=" confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >Add Item</button
                        >
                    </div>

                    <div class="relative overflow-x-auto">
                        <table
                            class="w-full mt-10 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                            <thead
                                class="text-xs text-gray-700 uppercase dark:text-gray-400"
                            >
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Brand
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Quantity
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each items as item}
                                    <tr class="bg-white border-b text-black">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium whitespace-nowrap"
                                        >
                                            {item.product}
                                        </th>
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium whitespace-nowrap"
                                        >
                                            {item.brand}
                                        </th>
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium whitespace-nowrap"
                                        >
                                            {item.quantity}
                                        </th>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="lg:my-5 my-10">
                    <div class="max-w-md mx-auto">
                        <div class="relative z-0 w-full mb-5 group">
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

                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
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
                            <div class="relative z-0 w-full mb-5 group">
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
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
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
                            <div class="relative z-0 w-full mb-5 group">
                                <label
                                    for="email"
                                    class="block text-gray-700 text-sm font-bold mb-2"
                                    >Address</label
                                >
                                <input
                                    type="text"
                                    bind:value={address}
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder=" "
                                    required
                                />
                            </div>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
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

                        <div class="relative z-0 w-full mb-5 group">
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
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
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
                                <option value="" selected>Select Day</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
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

                        <div class="flex items-center justify-between">
                            <button
                                on:click={() => proceed()}
                                class=" confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >Proceed</button
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
{/if}

{#if section == "payment"}
    <section class="guest-order-section bg-center bg-no-repeat">
        <div class="px-4 mx-auto text-center py-24 lg:py-16">
            <h1
                class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
            >
                Payment Options
            </h1>
            <p
                class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
            >
                Are you paying by card or by bank, or you want to go <button
                    on:click={() => (section = "order")}
                    class="text-blue-400">back</button
                >?
            </p>
            <button
                type="button"
                on:click={() => order("card")}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >By Card</button
            >
            <button
                type="button"
                on:click={() => order("bank")}
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >By Bank Transfer</button
            >
        </div>
    </section>
{/if}
