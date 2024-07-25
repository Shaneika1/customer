<script>
    import { onMount } from "svelte";

    let valid = false

    onMount(() => {
        let token = localStorage.getItem('token')
        if(token) {
            valid = true;
        }
    })
</script>


<section class="bg-white dark:bg-gray-900 jumbotron hidden lg:block">
    <div
        class="py-8 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16"
    >
        <div class="flex flex-col justify-center">
            <h1
                class="mb-4 text-4xl font-extrabold tracking-tight lg:mt-20 leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-700 header"
            >
                Errand Executers
            </h1>
            <p
                class="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-700 normal-text"
            >
                From premium grocery delivery and lifestyle consultancy to
                personalized wellness subscription boxes, our services are
                meticulously designed to promote healthier living while freeing
                up valuable time for our clients.
            </p>
            <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
                {#if valid == true}
                <a
                    href="/lists"
                    style="background-color: #48c4c2;"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                    Order Groceries
                    <svg
                        class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </a>
                {/if}

                {#if valid == false}
                <a
                href="/authentications/login"
                style="background-color: #48c4c2;"
                class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
                Get started
                <svg
                    class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </a>
                {/if}
            </div>
        </div>
        <div></div>
    </div>
</section>

<section
    class="lg:hidden block bg-center bg-no-repeat bg-[url('/5.png')] bg-gray-700 bg-blend-multiply"
>
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1
            class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl header"
        >
            Errand Executers
        </h1>
        <p
            class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48 normal-text"
        >
            From premium grocery delivery and lifestyle consultancy to
            personalized wellness subscription boxes, our services are
            meticulously designed to promote healthier living while freeing up
            valuable time for our clients.
        </p>
        <div
            class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
        >
        {#if valid == true}
            <a
                href="/lists"
                style="background-color: #48c4c2;"
                class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
             Order Groceries
                <svg
                    class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </a>
            {/if}

            {#if valid == false}
            <a
                href="/authentications/login"
                style="background-color: #48c4c2;"
                class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get Started
                <svg
                    class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </a>
            {/if}
        </div>
    </div>
</section>

<section class="about bg-center bg-no-repeat">
    <div class="px-4 mx-auto text-center py-24 lg:py-56">
        <h1
            class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
        >
            About Us
        </h1>
        <p
            class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
        >
            At Errand Executer, we're not just about delivering services; we're
            pioneering a movement towards transformative lifestyle changes that
            drive financial empowerment, holistic wellness, and community
            upliftment. Our core mission revolves around three pivotal pillars:
            education, service, and social responsibility.
        </p>
        <div
            class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
        ></div>
    </div>
</section>

<section class="lg:grid lg:grid-cols-2 h-100 py-24 lg:py-46">
    <div class="mx-auto lg:mx-1 mx-5 text-center lg:text-left">
        <h1
            class="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl sm:px-16 lg:px-40 lg:text-6xl header"
        >
            What sets us apart is...
        </h1>
        <div>
            <p
                class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-40 normal-text"
            >
                Our unwavering commitment to education, community development,
                and social responsibility. Not only do we aspire to streamline
                lifestyles and inspire healthier choices, but we also foster job
                creation within our communities and engage in philanthropic
                initiatives to support those in need.
            </p>
            <p
                class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-40 normal-text"
            >
                Beyond our commercial endeavors, we're deeply invested in
                community development. By providing employment opportunities and
                engaging in charitable activities, we aim to make a tangible,
                positive impact on the lives of individuals in our communities.
            </p>
            <a
                href="/blogs"
                class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-40 normal-text"
            >
                <p
                   
                    style="background-color: #48c4c2;"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                    Check our our blog section
                    <svg
                        class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </p>
            </a>
        </div>
    </div>
    <div class="px-10 lg:block hidden" style="height:900px;">
        <div
            class="w-full h-full bg-center bg-no-repeat bg-[url('/2.png')]"
        ></div>
    </div>
</section>

<section class=" bg-center bg-no-repeat">
    <div class="px-4 mx-auto text-center  lg:py-10">
        <h1
            class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
        >
            Our Services
        </h1>
        <p
            class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
        >
            Discover convenience, efficiency, and tailored solutions with our
            diverse range of services.
        </p>
        <div
            class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
        ></div>
        <div class="lg:grid lg:grid-cols-3">
            <div class="column">
                <div class="top-block"></div>
                <p class="discover mt-1">SUBSCRIPTION BOX SERVICES</p>
                <p class="nate-row-text">
                    Subscribe to our premium box service for targeted
                    supplements aiding weight loss, PCOS, and immunity. Enjoy
                    personalized guidance from a nutritionist and chef!
                    <br />
                    <nuxt-link to="/subscription">
                        <button
                            style="
                        background-color: rgb(56, 56, 56);
                        font-family:'Playfair Display', serif;
                      "
                            class="head mt-3 lg:mr-1 animate-slide-element-reverse border text-white hover:text-white py-2 px-4 transition duration-300 ease-in-out"
                        >
                            Coming Soon
                        </button>
                    </nuxt-link>
                </p>
            </div>
            <div class="column">
                <div class="top-block"></div>
                <p class="discover mt-1">GROCERY DELIVERY</p>
                <p class="nate-row-text">
                    Enjoy hassle-free grocery delivery with personalized service, tailored to your needs. Create your grocery list and let us handle the rest.
                    <br />
                    {#if valid == true}
                    <a href="/lists">
                        <button
                            style="
                        background-color: rgb(56, 56, 56);
                        font-family:'Playfair Display', serif;
                      "
                            class="head mt-3 lg:mr-1 animate-slide-element-reverse border text-white hover:text-white py-2 px-4 transition duration-300 ease-in-out"
                        >
                            Create Grocery List
                        </button>
                    </a>
                    {/if}

                    {#if valid == false}

                    <a href="/authentications/login">
                        <button
                            style="
                        background-color: rgb(56, 56, 56);
                        font-family:'Playfair Display', serif;
                      "
                            class="head mt-3 lg:mr-1 animate-slide-element-reverse border text-white hover:text-white py-2 px-4 transition duration-300 ease-in-out"
                        >
                            Create Grocery List
                        </button>
                    </a>
                    {/if}
                </p>
            </div>
            <div class="column">
                <div class="top-block"></div>
                <p class="discover mt-1">INVENTORY PURCHASE SOLUTIONS</p>
                <p class="nate-row-text">
                    Join our Business Inventory Support program designed for entrepreneurs seeking efficient inventory management. We streamline your procurement process, ensuring seamless supply chain solutions to optimize your business operations
                    <br />
                    <nuxt-link to="/subscription">
                        <button
                            style="
                        background-color: rgb(56, 56, 56);
                        font-family:'Playfair Display', serif;
                      "
                            class="head mt-3 lg:mr-1 animate-slide-element-reverse border text-white hover:text-white py-2 px-4 transition duration-300 ease-in-out"
                        >
                           Coming Soon
                        </button>
                    </nuxt-link>
                </p>
            </div>
        </div>
    </div>
</section>

<section class="bg-white dark:bg-gray-900 vip lg:block p-5">
    <div
        class="py-8 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16"
    >
        <div class="flex flex-col justify-center">
            <h1
                class="mb-4 text-4xl font-extrabold tracking-tight lg:mt-20 leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-700 header"
            >
                Elevate Your Lifestyle with Our <span class='text-yellow-700'>VIP CLUB</span>
            </h1>
            <p
                class="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-700 normal-text"
            >
            Our membership club is exclusively crafted for those who value luxury and prioritize their time. With a dedicated personal assistant, experience unparalleled convenience tailored for the discerning few who demand excellence. Redefine your lifestyle and revel in the pinnacle of luxury and efficiency.
            </p>
            <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
                <!-- <a
                    href="#"
                    style="background-color: #48c4c2;"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                    Get started
                    <svg
                        class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </a> -->
            </div>
        </div>
        <div></div>
    </div>
</section>

<footer class="bg-white  footer-f" style='background-color:rgb(72, 196, 194); color:white;'>
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
              <a href="https://flowbite.com/" class="flex items-center">
                  <img src="/lo.png" class="h-8 me-3" alt="FlowBite Logo" />
               
              </a>
          </div>
          <div class="lg:grid lg:grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-3">
              <div class='mb-5'>
                  <h2 class="mb-1 text-sm font-semibold text-gray-900 uppercase">Links</h2>
                  <ul class=" font-medium">
                      <li class="my-2">
                          <a href="/faq" class="hover:underline">Frequently Asked Questions (FAQ)</a>
                      </li>
                      <li>
                          <a href="#" class="hover:underline">Support</a>
                      </li>
                    
                  </ul>
              </div>
              <div class='mb-5'>
                  <h2 class=" text-sm font-semibold text-gray-900 uppercase dark:text-gray-800">Links</h2>
                  <ul class=" font-medium">
                    <li class="my-2">
                        <a href="#" class="hover:underline">Refund and Returns Policy</a>
                    </li>
                    <li>
                        <a href="/accounts" class="hover:underline">Bank Accounts</a>
                    </li>
                   
                  </ul>
              </div>
              <div>
                  <h2 class="text-sm font-semibold text-gray-900 uppercase dark:text-gray-800">Contacts</h2>
                  <ul class="mb-5 font-medium" >
                      <li class="my-2">
                          <a href="#" class="hover:underline">Phone: 1 (876) 338-2745</a>
                      </li>
                      <li>
                          <a href="#" class="hover:underline">Email: errandexecuter@gmail.com</a>
                      </li>
                  </ul>
              </div>
              
            </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm  sm:text-center ">© 2024 <a href="https://flowbite.com/" class="hover:underline">Errand Executers</a>. All Rights Reserved.
          </span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" class="dark:text-gray-800 hover:text-gray-900 dark:hover:text-white">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                        <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                    </svg>
                  <span class="sr-only">Facebook page</span>
              </a>
              <a href="#" class="dark:text-gray-800 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                        <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                    </svg>
                  <span class="sr-only">Discord community</span>
              </a>
              <a href="#" class="dark:text-gray-800 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                    <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                </svg>
                  <span class="sr-only">Twitter page</span>
              </a>
              <a href="#" class="dark:text-gray-800 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                  </svg>
                  <span class="sr-only">GitHub account</span>
              </a>
              <a href="#" class="dark:text-gray-800 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd"/>
                </svg>
                  <span class="sr-only">Dribbble account</span>
              </a>
          </div>
      </div>
    </div>
</footer>
