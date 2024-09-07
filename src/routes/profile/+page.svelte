<script lang="ts">
    import swal from "sweetalert2";
    import b from "crypto-js";
    import supabase from "../../lib/supabase";
    import moment from "moment";
    import {
        getUser,
        generateRandomNumber,
        generateOrderId,
        checkFields,
        checkEmail,
    } from "$lib/index";
    import { onMount } from "svelte";

    let firstname: string = "";
    let lastname: string = "";
    let email: string = "";
    let phone: string = "";

    let password: string = "";
    let cPassword: string = "";

    let subscription = {};

    let email2: string = "";

    let section: string = "table";

    let orders = [];
    let worker = {};

    const savePassword = async () => {
        if (checkFields({ password, cPassword })) {
            if (cPassword == password) {
                let hash = b.AES.encrypt(password, "efdafdsdfdsd").toString();
                await supabase
                    .from("customers")
                    .update("password", hash)
                    .eq("email", email2);
                swal.fire("Success", "Information Saved", "success");
            } else {
                swal.fire("Oops", "Please make sure passwords match", "error");
            }
        } else {
            swal.fire(
                "Oops",
                "Please enter information in all fields",
                "error",
            );
        }
    };

    const save = async () => {
        if (checkFields(firstname, lastname, email, phone)) {
            await supabase
                .from("customers")
                .update({ firstname, lastname, email, phone })
                .eq("email", email2)
                .then((res) => {
                    swal.fire("Success", "Information Saved", "success");
                    loadInfo();
                });
        } else {
            swal.fire(
                "Oops",
                "Please enter information in all fields",
                "error",
            );
        }
    };

    const viewDriver = async (id) => {
        await supabase
            .from("users")
            .select()
            .eq("id", id)
            .then((res) => {
                worker = res.data[0];
                section = "driver";
                
            });
    };

    const loadInfo = async () => {
        let token = localStorage.getItem("token");
        let user = await getUser(token);
        firstname = user.firstname;
        lastname = user.lastname;
        email = user.email;
        email2 = user.email;
        phone = user.phone;
        subscription = user.vip ? user.vip : {};

        await supabase
            .from("orders")
            .select()
            .eq("email", email)
            .then((res) => {
                orders = res.data;
            });
    };

    onMount(() => {
        loadInfo();
    });
</script>

<section class="guest-order-section bg-center bg-no-repeat">
    <div class="px-4 mx-auto text-center pt-10 lg:py-16">
        <h3
            class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
        >
            Profile
        </h3>
        <p
            class="mb-8 text-lg text-center font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
        >
            View your profile settings and orders here
        </p>
    </div>

    <div class="mx-1 p-10" style="">
        <div class="lg:grid lg:grid-cols-2 text-left lg:px-5">
            <div class="lg:my-5 my-10">
                <div class="max-w-md mx-auto">
                    <div class="relative z-0 w-full mb-5 group">
                        <label
                            for="email"
                            class="block text-gray-700 text-sm font-bold mb-2"
                            >Enter First Name</label
                        >
                        <input
                            type="text"
                            bind:value={firstname}
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
                            >Enter Last Name</label
                        >
                        <input
                            type="text"
                            bind:value={lastname}
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
                            >Enter Email</label
                        >
                        <input
                            type="text"
                            bind:value={email}
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
                            >Enter Phone#</label
                        >
                        <input
                            type="text"
                            bind:value={phone}
                            name="floating_email"
                            id="floating_email"
                            class=" w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder=" "
                            required
                        />
                    </div>

                    <button
                        on:click={() => save()}
                        class=" confirm-buttons mb-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >Save List</button
                    ><br />

                    <div class="relative z-0 w-full mb-5 group mt-5">
                        <label
                            for="email"
                            class="block text-gray-700 text-sm font-bold mb-2"
                            >Enter New Password</label
                        >
                        <input
                            type="password"
                            bind:value={password}
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
                            >Confirm New Password</label
                        >
                        <input
                            type="password"
                            bind:value={cPassword}
                            name="floating_email"
                            id="floating_email"
                            class=" w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder=" "
                            required
                        />
                    </div>

                    <button
                        on:click={() => savePassword()}
                        class=" confirm-buttons mb-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >Save New Password</button
                    >
                </div>
            </div>

            <div class="lg:my-5 my-10">
                <p class="text-2xl font-bold">Subscripion Package</p>
                {#if subscription != {}}
                    <div>
                        <p class="mt-3">
                            Subscription Type: {#if subscription.type == "Platinum"}
                                <span class="text-xl text-gray-600 font-bold"
                                    >Platinum</span
                                >
                            {/if}
                            {#if subscription.type == "Gold"}
                                <span class="text-xl text-yellow-600 font-bold"
                                    >Gold</span
                                >
                            {/if}
                        </p>
                        <p class="my-1">
                            Date Purchased: <span class="font-bold"
                                >{moment(subscription.from).format(
                                    "MMMM Do YYYY, h:mm:ss a",
                                )}</span
                            >
                        </p>
                        <p class="my-1">
                            Expiry Date: <span class="font-bold"
                                >{moment(subscription.to).format(
                                    "MMMM Do YYYY, h:mm:ss a",
                                )}</span
                            >
                        </p>
                        <p class="my-1">
                            Status: <span class="font-bold"
                                >{subscription.status}</span
                            >
                        </p>
                    </div>

                    {#if subscription.type == "Gold"}
                        <div class="mt-10">
                            <h3 class="text-3xl" style="margin-bottom: 10px; ">
                                The Gold Package
                            </h3>
                            <p class=" mb-3 text-lg">
                                Our Gold Membership is designed for those who appreciate simplicity and efficiency. Enjoy one seamless grocery delivery per month with the option to have your items thoughtfully packed into your refrigerator. With your dedicated personal assistant, you’ll bypass the website and experience priority scheduling, ensuring your needs are met with the utmost care and precision.

                            </p>
                            
                        </div>
                    {/if}

                    {#if subscription.type == "Platinum"}
                        <div class="container py-5">
                            <div class="text-div">
                                <h3
                                    class="text-3xl"
                                    style="margin-bottom: 10px; margin-top: 40px"
                                >
                                    The Platinum Package
                                </h3>
                                <p class="jumbo-text mb-3 text-lg">
                                    The Platinum Membership is the pinnacle of personalized service. Tailored specifically to your unique lifestyle, this membership begins with a 30-minute consultation to understand your specific needs. Whether you require specialized errands or have distinct preferences, we craft a bespoke package just for you. Experience luxury, convenience, and exclusivity at its finest, all curated to fit your life perfectly.
                                </p>
                               
                                
                            </div>
                        </div>
                    {/if}
                {/if}

                {#if subscription == {} || subscription == null || subscription.status == 'inactive' }
                        <p>You are not subscribed</p>
                {/if}
            </div>
        </div>
    </div>
</section>
