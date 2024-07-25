<script lang="ts">
    import swal from "sweetalert2";
    import b from "crypto-js";
    import supabase from "../../lib/supabase";
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
                console.log(worker);
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
    <div class="px-4 mx-auto text-center py-24 lg:py-16">
        <h1
            class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
        >
            Profile
        </h1>
        <p
            class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
        >
            View your profile settings and orders here
        </p>
    </div>

    <div
        class="mx-1 p-10"
        style=""
    >
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

            

            
        </div>
    </div>
</section>
