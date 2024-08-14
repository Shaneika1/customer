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

    let loading = false;
    let status = '';

    const getParams = async () => {
        // Get the query parameters from the current URL
        const params = new URLSearchParams(window.location.search);

        // Convert parameters to an object
        const paramsObj = {};
        for (const [key, value] of params) {
            paramsObj[key] = value;
        }

        // Display the parameters
        console.log(paramsObj);

        if (paramsObj.status == "success") {
            status = 'success'
            await supabase
                .from("orders")
                .update({ status: "Pending" })
                .eq("orderId", paramsObj.order_id)
                .then((res) => {
                    loading = false;
                });
        } else {
            status = 'cancelled'
            await supabase
                .from("orders")
                .update({ status })
                .eq("orderId", paramsObj.order_id)
                .then((res) => {
                    loading = false;
                });
        }
    };

    onMount(() => {
        getParams();
    });
</script>

{#if loading == false}
    <section class="guest-order-section bg-center bg-no-repeat">
        <div class="px-4 mx-auto text-center pt-10 lg:py-16">
            <h3
                class="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
            >
                Your Order was Successful
               <!-- {#if status == 'cancelled' } Your Order was Unsuccessful {/if} -->
            </h3>
            <p
                class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
            >
                For more information, check out the order history section.
            </p>
        </div>
        <div class="mx-1 p-10" style="">
            <div class="">
                <div class="col-span-6 border-2 p-5 my-3">
                    <p class="text-xl font-bold">Jamaica National Bank</p>
                    <p>Name: Sheneika Davidson</p>
                    <p>Account Type: Savings</p>
                    <p>Account Number: 002094536151</p>
                    <p>Portmore Pines Branch</p>
                </div>
            </div>
    
            <div class="">
                <div class="col-span-6 border-2 p-5 my-3">
                    <p class="text-xl font-bold">Scotia Bank</p>
                    <p>Name: Errand Executer</p>
                    <p>Account Type: Savings</p>
                    <p>Account Number: 002094536151</p>
                    <p>Dominica Drive Branch</p>
                </div>
            </div>
    
            <div class="">
                <div class="col-span-6 border-2  p-5 my-3">
                    <p class="text-xl font-bold">CIBC First Caribbean Bank</p>
                    <p>Name: Sheneika Davidson</p>
                    <p>Account Type: Chequing </p>
                    <p>Account Number: 1002244847</p>
                    <p>Branch: Liguanea</p>
                </div>
            </div>
    
            <div class="">
                <div class="col-span-6 border-2  p-5 my-3">
                    <p class="text-xl font-bold">Sagicor Bank</p>
                    <p>Name: Errand Executer</p>
                    <p>Account Type: Savings </p>
                    <p>Account Number: 550498905</p>
                    <p>Branch: Dominica Drive</p>
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
