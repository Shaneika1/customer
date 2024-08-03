<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios"
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

    let user = {};

    const loadData = async () => {
        loading = true;
        let data = await supabase.from("blogs").select();
        blogs = data.data;
        loading = false;
    };

    const subscribe = async (value, type) => {
        loading = true
        let user = await getUser(localStorage.getItem("token"));
        let orderId = await generateSubId();
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
                    let currentTime = moment()
                    let vipObj = {
                        from: currentTime.format(),
                        to: currentTime.add(1, 'month').format(),
                        type,
                        status: 'Pending'
                    }

                    await supabase.from('customers').update({vip: vipObj, subId: orderId}).eq('id', user.id).then(res => {
                        loading = false
                        window.location.href = result.data.url;
                    })
                   
                })
                .catch((err) => {
                    console.error(err);
                });

                loading = false
    }

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
        <div class="px-4 mx-auto text-center pt-10 lg:py-16">
            <h1
                class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
            >
                Elevate Your Lifestyle with Our VIP Club
            </h1>
            <p
                class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
            >
                Welcome to the Errand Executer VIP Club, where exclusivity meets
                unparalleled convenience. For just $30,000 every three months,
                enjoy the elite service of having a dedicated personal
                assistant, one of our business owners, handling your grocery
                errands with the utmost discretion and priority.
            </p>
        </div>
        <div class="mx-1 px-10 lg:grid lg:grid-cols-4" style="">
            <div class="image-div block lg:hidden col-span-2  py-5">
                <img src="/2.png" style='width:100%;' alt="Descriptive Alt Text" class="row-image" />
              </div>
            <div class=" col-span-2">
                <div class=" ">
                    <h3
                        class="text-3xl"
                        style="margin-bottom: 10px; "
                    >
                        The Gold Package
                    </h3>
                    <p class=" mb-3 text-lg">
                        Introducing our VIP Gold package, your gateway to a life
                        of unprecedented convenience and luxury. With this
                        membership, you gain exclusive access to a dedicated
                        personal assistant ready to streamline your daily chores
                        and elevate your lifestyle.
                    </p>
                    <p class="mb-3 text-xl">Included Services:</p>
                    <ul>
                        <li class="mb-2 text-lg">
                            Grocery Shopping Excellence: Once a month, rest easy
                            as our trusted assistant handles your shopping list
                            with care and precision, ensuring you get exactly
                            what you desire, delivered straight to your door.
                        </li>
                        <li class="mb-2 text-lg">
                            Home Maintenance & Laundry Bliss: Bi-weekly, our
                            team transforms your home into a sanctuary with a
                            thorough cleaning session and laundry service,
                            offering you the utmost comfort.
                        </li>
                        <li class="mb-2 text-lg">
                            Errands, Made Effortless: Twice a month, delegate
                            any errand under an hour to our resourceful
                            assistant. From gift purchasing to market runs,
                            courier pickups, or even quick food orders, we've
                            got it covered.
                        </li>
                        <li class="mb-2 text-lg">
                            A Gourmet Treat: Enjoy the culinary artistry of a
                            professional chef with a complimentary meal
                            experience each month, valued at $4000JMD, curated
                            exclusively for our VIP Gold members.
                        </li>
                    </ul>
                    <p class="jumbo-text mb-3 text-lg">
                        Experience the essence of luxury living and liberate
                        your time for what truly matters with our VIP Gold
                        package.
                    </p>
                    <button
                                            style="background-color:#e4c817; color:black;"
                                            on:click={() =>
                                                subscribe(4000, 'Gold')}
                                            class="mb-5 confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >Subscribe to our gold package</button
                                        >
                </div>

                <div class="container py-5">
                    <div class="text-div">
                      <h3
                          class="text-3xl"
                        style="margin-bottom: 10px; margin-top: 40px"
                      >
                        The Platinum Package
                      </h3>
                      <p class="jumbo-text mb-3 text-lg">
                        Introducing our exquisite Platinum membership, tailored for those who
                        demand the absolute pinnacle of convenience, luxury, and exclusive
                        services.
                      </p>
                      <p class="mb-3 text-xl">Included Services:</p>
                      <ul>
                        <li class="mb-2 text-lg">
                          Grocery Shopping Elegance: Twice a month, experience seamless
                          grocery shopping as our dedicated assistants fulfill your list with
                          precision and care, ensuring you receive only the best.
                        </li>
                        <li class="mb-2 text-lg">
                          Home Maintenance & Revitalization: Bi-weekly, indulge in the luxury
                          of a clean and refreshing home. Our expert team ensures your abode
                          remains a serene sanctuary.
                        </li>
                        <li class="mb-2 text-lg">
                          Errands, Made Effortless: Twice a month, delegate any errand under
                          an hour to our resourceful assistant. From gift purchasing to market
                          runs, courier pickups, or even quick food orders, we've got it
                          covered.
                        </li>
                        <li class="mb-2 text-lg">
                          Comprehensive Errand Assistance: Four times a month, delegate any
                          errand, from gift purchasing to market runs, courier pickups, or
                          quick food orders. Effortlessly accomplish your tasks with our
                          expert assistance.
                        </li>
                        <li class="mb-2 text-lg">
                          Luxurious Spa Experience: A complimentary spa ticket valued at
                          $7000JMD, allowing you to rejuvenate and unwind in blissful
                          tranquility.
                        </li>
                        <li class="mb-2 text-lg">
                          Exclusive Babysitter Service: Once a month, unwind and enjoy a
                          stress-free night out, leaving your little ones in the capable hands
                          of our highly customizable expert babysitter service.
                        </li>
                      </ul>
                      <p class="jumbo-text mb-3 text-lg">
                        Customizable to your unique needs, this membership allows you to
                        interview and select your personal assistant according to your
                        preferences. Additionally, members enjoy the flexibility to tailor
                        services based on their individual requirements.
                      </p>
                      <button
                      on:click={() =>
                          subscribe(7000, 'Platinum')}
                      class="mb-5 confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >Subscribe to our platinum package</button
                  >
                    </div>
                
                </div>
            </div>

            <div class="image-div hidden lg:block col-span-2 px-20">
                <img src="/2.png" style='width:100%;' alt="Descriptive Alt Text" class="row-image" />
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
