<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import moment from "moment";
    import {
        getUser,
        generateRandomNumber,
        generateSubId,
        checkFields,
    } from "$lib/index";
    import supabase from "$lib/supabase";
    import swal from "sweetalert2";

    let blogs = [];
    let item = "";
    let editing = false;
    let loading = false;
    let section = "blogs";
    let curBlog = {};
    let subscribed = false;
    let readGold = false;
    let readPlatinum = false;

    let user = {};

    const loadData = async () => {
        loading = true;
        let data = await supabase.from("blogs").select();
        blogs = data.data;
        
        if (user.vip && user.vip.status == "active") {
            subscribed = true;
        }
        loading = false;
    };

    const subscribe = async (value, type) => {
        
        user = await getUser(localStorage.getItem("token"));
        if(user.vip != null) {
            swal.fire('oops', 'You are already subscribed', 'error')
        } else {
            loading = true;

        let orderId = await generateSubId();
        const params = new URLSearchParams();
        params.append("account_number", "2656269605");
        params.append("country_code", "JM");
        params.append("currency", "JMD");
        params.append("avs", "0");
        params.append("data", '{"a":"b"}');
        params.append("environment", "live");
        params.append("fee_structure", "customer_pay");
        params.append("method", "credit_card");
        params.append("order_id", orderId.toString());
        params.append("origin", orderId.toString());
        params.append("response_url", `https://errandexecuter.com/vipComplete`);
        params.append("total", parseInt(value.toString()).toFixed(2));

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
            .then(async (result) => {
                console.log(result.data.url);
                let currentTime = moment();
                let vipObj = {
                    from: currentTime.format(),
                    to: currentTime.add(3, "month").format(),
                    type,
                    status: "Pending",
                };

                await supabase
                    .from("customers")
                    .update({ vip: vipObj, subId: orderId })
                    .eq("id", user.id)
                    .then((res) => {
                        loading = false;
                        window.location.href = result.data.url;
                    });
            })
            .catch((err) => {
                console.error(err);
            });

        loading = false;
        }
        
    };

    const selectBlog = (blog) => {
        curBlog = blog;
        section = "read";
    };

    onMount(() => {
        loadData();
    });
</script>

{#if loading == false}
    <section class="guest-order-section bg-center bg-no-repeat">
        <!-- <div class="px-4 mx-auto text-center pt-10 lg:py-16">
            <h3
                class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 lg:text-6xl header"
            >
                Elevate Your Lifestyle with Our VIP Club
            </h3>
            <p
                class="mb-8 text-lg text-center font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
            >
                Welcome to the Errand Executer VIP Club, where exclusivity meets
                unparalleled convenience. For just $30,000 every three months,
                enjoy the elite service of having a dedicated personal
                assistant, one of our business owners, handling your grocery
                errands with the utmost discretion and priority.
            </p>
        </div> -->

        <section
            class="bg-center bg-no-repeat bg-[url('/img/beach.jpg')] bg-gray-700 bg-blend-multiply"
        >
            <div
                class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56"
            >
                <h2
                    class="mb-7 text-3xl text-left lg:text-center tracking-tight leading-none text-white md:text-5xl lg:text-5xl"
                >
                    Welcome to the world of personalized luxury with our <span
                        style="color:#FFD700">VIP CLUB</span
                    >
                </h2>
                <p
                    class="mb-8 text-left lg:text-center text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"
                >
                    Step into a world where your time is your most treasured
                    luxury. At the Errand Executer VIP Club, we don’t just offer
                    convenience—we craft an experience that’s tailored to your
                    every need. Imagine the peace of mind that comes with
                    knowing your personal assistant, an integral part of our
                    elite team, is dedicated to managing your tasks with the
                    utmost care and discretion
                </p>
                <div
                    class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
                >
                    <div class="w-100 flex justify-content mr-5">
                        {#if subscribed == false}
                            <button
                                  style="background:rgb(14 14 14); "
                        class="lg:mb-5 confirm-buttons text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                on:click={() => subscribe(30000, "Gold")}
                                ><p class="text-yellow-500">Gold VIP Membership</p></button
                            >
                        {/if}

                        {#if subscribed == true}
                        <button
                        disabled
                        style="background:rgb(14 14 14); "
                        class="lg:mb-5 confirm-buttons text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        ><p class="text-yellow-500">You are already subscribed</p></button
                    >
                        {/if}
                    </div>
                    <div class="w-100 flex justify-content mr-5">
                        <button
                                style="background:rgb(14 14 14)"
                                on:click={() => location.href = 'https://calendly.com/errandexecuter/30min'}
                                class="mb-5 confirm-buttons text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                ><p class="text-yellow-500">
                                    Platinium Membership
                                </p></button
                            >
                        
                    </div>
                </div>
            </div>
        </section>

        <div class="mx-1 lg:px-10 overflow-x-scroll">
            <div class="lg:grid lg:grid-cols-3">
                <div
                    class="my-10 lg:mx-5 cards border border-gray-300 bg-dark rounded-lg shadow-md transition-transform lg:transform lg:hover:scale-105 lg:hover:bg-gray-200"
                >
                    <div class="">
                        <!-- Card content goes here -->
                        <img
                            src="/unnamed.jpg"
                            style="width:100%;"
                            alt="Descriptive Alt Text"
                            class="row-image"
                        />

                        <div class="m-5">
                            <h2 class="text-2xl mb-2 mt-10">
                                The Gold Package
                            </h2>
                            <p>
                                Experience the luxury of time well spent with
                                our 3-month Grocery Concierge Membership. Let
                                your dedicated personal assistant take care of
                                your monthly grocery delivery with precision and
                                care, allowing you to indulge in life’s finer
                                moments. Perfect for those who appreciate
                                seamless service, whether we coordinate directly
                                with you or your household staff, you’ll enjoy
                                effortless convenience every month.
                            </p>

                            <button on:click={() => readGold = !readGold} style="background:rgb(14 14 14); "
                            class="mt-5  confirm-buttons text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"><span
                            style="color:#FFD700">Learn more</span></button><br/>

                            {#if readGold == true}
                               <p class='mt-3'>Our Gold Membership is designed for those who appreciate simplicity and efficiency. Enjoy one seamless grocery delivery per month with the option to have your items thoughtfully packed into your refrigerator. With your dedicated personal assistant, you’ll bypass the website and experience priority scheduling, ensuring your needs are met with the utmost care and precision.</p>
                            {/if}
                            <div class="w-100 flex justify-content mt-5">
                                {#if subscribed == false}
                                    <button
                                        style="background-color:#B8860B; color:white;"
                                        on:click={() =>
                                            subscribe(30000, "Gold")}
                                        class="mb-5 confirm-buttons text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        > Start Your Membership</button
                                    >
                                {/if}

                                {#if subscribed == true}
                                    <button
                                        style="background-color:#e4c817; color:black;"
                                        class="mb-5 confirm-buttons text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >You are already subscribed</button
                                    >
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="my-10  cards border border-gray-300 bg-dark rounded-lg shadow-md transition-transform transform lg:hover:scale-105 lg:hover:bg-gray-200"
                >
                    <div class="">
                        <!-- Card content goes here -->
                        <img
                            src="/unnamed2.jpg"
                            style="width:100%;"
                            alt="Descriptive Alt Text"
                            class="row-image "
                        />
                        <div class="m-5">
                            <h2 class="text-2xl mb-2 mt-10">
                                The Platinum Package
                            </h2>
                            <p>
                                Toast to the luxury of time well spent. Our
                                Platinum Membership offers you the ultimate
                                personalized service, crafted for those who
                                value exclusivity and bespoke attention. With a
                                dedicated personal assistant at your service,
                                enjoy seamless grocery delivery, tailored
                                premium offerings, and the sophistication of a
                                lifestyle curated to perfection.
                            </p>
                            <button on:click={() => readPlatinum = !readPlatinum} style="background:rgb(14 14 14); "
                            class="mt-5  confirm-buttons text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"><span
                            style="color:#FFD700">Learn more</span></button><br/>

                            {#if readPlatinum == true}
                                <p class='mt-3'>The Platinum Membership is the pinnacle of personalized service. Tailored specifically to your unique lifestyle, this membership begins with a 30-minute consultation to understand your specific needs. Whether you require specialized errands or have distinct preferences, we craft a bespoke package just for you. Experience luxury, convenience, and exclusivity at its finest, all curated to fit your life perfectly.</p>
                               
                            {/if}

                            <!-- <div class='w-100 flex justify-content mt-5'>
                                {#if subscribed == false}
                                <button
                                    on:click={() => subscribe(7000, "Platinum")}
                                    class="mb-5 confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >Subscribe to our platinum package</button
                                >
                            {/if}
                            {#if subscribed == true}
                                <button
                                    class="mb-5 confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >You are already subscribed</button
                                >
                            {/if} -->
                            <div class="w-100 flex justify-content">
                                <a
                                    href="https://calendly.com/errandexecuter/30min"
                                    class="mt-3 text-white"
                                    ><button
                                        style="color:linear-gradient(180deg, #A8A9AD, #B4B5B8, #C0C0C3, #CBCCCD, #D7D7D8, #E3E3E3); background:rgb(14 14 14); "
                                        class="mb-5 confirm-buttons text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        ><p class="">
                                            Customize Your Membership
                                        </p></button
                                    ></a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
