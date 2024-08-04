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
            class="mb-4 text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
        >
            Profile
        </h3>
        <p
            class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
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
                                    >Platinum</span
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
                                Introducing our VIP Gold package, your gateway
                                to a life of unprecedented convenience and
                                luxury. With this membership, you gain exclusive
                                access to a dedicated personal assistant ready
                                to streamline your daily chores and elevate your
                                lifestyle.
                            </p>
                            <p class="mb-3 text-xl">Included Services:</p>
                            <ul>
                                <li class="mb-2 text-lg">
                                    Grocery Shopping Excellence: Once a month,
                                    rest easy as our trusted assistant handles
                                    your shopping list with care and precision,
                                    ensuring you get exactly what you desire,
                                    delivered straight to your door.
                                </li>
                                <li class="mb-2 text-lg">
                                    Home Maintenance & Laundry Bliss: Bi-weekly,
                                    our team transforms your home into a
                                    sanctuary with a thorough cleaning session
                                    and laundry service, offering you the utmost
                                    comfort.
                                </li>
                                <li class="mb-2 text-lg">
                                    Errands, Made Effortless: Twice a month,
                                    delegate any errand under an hour to our
                                    resourceful assistant. From gift purchasing
                                    to market runs, courier pickups, or even
                                    quick food orders, we've got it covered.
                                </li>
                                <li class="mb-2 text-lg">
                                    A Gourmet Treat: Enjoy the culinary artistry
                                    of a professional chef with a complimentary
                                    meal experience each month, valued at
                                    $4000JMD, curated exclusively for our VIP
                                    Gold members.
                                </li>
                            </ul>
                            <p class="jumbo-text mb-3 text-lg">
                                Experience the essence of luxury living and
                                liberate your time for what truly matters with
                                our VIP Gold package.
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
                                    Introducing our exquisite Platinum
                                    membership, tailored for those who demand
                                    the absolute pinnacle of convenience,
                                    luxury, and exclusive services.
                                </p>
                                <p class="mb-3 text-xl">Included Services:</p>
                                <ul>
                                    <li class="mb-2 text-lg">
                                        Grocery Shopping Elegance: Twice a
                                        month, experience seamless grocery
                                        shopping as our dedicated assistants
                                        fulfill your list with precision and
                                        care, ensuring you receive only the
                                        best.
                                    </li>
                                    <li class="mb-2 text-lg">
                                        Home Maintenance & Revitalization:
                                        Bi-weekly, indulge in the luxury of a
                                        clean and refreshing home. Our expert
                                        team ensures your abode remains a serene
                                        sanctuary.
                                    </li>
                                    <li class="mb-2 text-lg">
                                        Errands, Made Effortless: Twice a month,
                                        delegate any errand under an hour to our
                                        resourceful assistant. From gift
                                        purchasing to market runs, courier
                                        pickups, or even quick food orders,
                                        we've got it covered.
                                    </li>
                                    <li class="mb-2 text-lg">
                                        Comprehensive Errand Assistance: Four
                                        times a month, delegate any errand, from
                                        gift purchasing to market runs, courier
                                        pickups, or quick food orders.
                                        Effortlessly accomplish your tasks with
                                        our expert assistance.
                                    </li>
                                    <li class="mb-2 text-lg">
                                        Luxurious Spa Experience: A
                                        complimentary spa ticket valued at
                                        $7000JMD, allowing you to rejuvenate and
                                        unwind in blissful tranquility.
                                    </li>
                                    <li class="mb-2 text-lg">
                                        Exclusive Babysitter Service: Once a
                                        month, unwind and enjoy a stress-free
                                        night out, leaving your little ones in
                                        the capable hands of our highly
                                        customizable expert babysitter service.
                                    </li>
                                </ul>
                                <p class="jumbo-text mb-3 text-lg">
                                    Customizable to your unique needs, this
                                    membership allows you to interview and
                                    select your personal assistant according to
                                    your preferences. Additionally, members
                                    enjoy the flexibility to tailor services
                                    based on their individual requirements.
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
