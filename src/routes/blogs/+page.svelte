<script lang="ts">
    import { onMount } from "svelte";
    import moment from "moment";
    import {
        getUser,
        generateRandomNumber,
        generateOrderId,
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
            <h3
                class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 xl lg:text-6xl header"
            >
                Blogs
            </h3>
            <p
                class="mb-8 text-lg text-center text-left  font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
            >
                Read and Enjoy content on our blog section
            </p>

            {#if blogs.length == 0}
                <p
                    class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
                >
                    No Blogs Available. Come back later
                </p>
            {/if}
        </div>
        <div
            class="mx-1 lg:px-20 ml-6"
            style=""
        >
            {#if section == "blogs"}
                <div class="lg:grid lg:grid-cols-5">
                    {#each blogs as blog}
                        <div
                            style="cursor:pointer;"
                            class="my-5 lg:my-1"
                            on:click={() => selectBlog(blog)}
                        >
                            <div>
                                <p class="lg:text-xl text-xl font-normal">
                                    {blog.title}
                                    
                                </p>
                                <span class="text-xs text-gray-800"
                                >By: {blog.by}</span
                            ><br/>
                                <small class="text-gray-600"
                                    >{moment(blog.created_at).format(
                                        "MMMM Do YYYY, h:mm:ss a",
                                    )}</small
                                >
                            </div>
                            <div class="w-full py-3">
                                <img
                                    src={blog.image}
                                    style="width:300px; height:200px; object-fit: cover; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                                />
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}

            {#if section == "read"}
                <div class="lg:text-center lg:justify-content mb-20">
                    <h3 class="lg:text-4xl text-xl font-bold my-5">{curBlog.title}</h3>
                    
                    <p class="text-lg mb-5">By: {curBlog.by}</p>
                    <div
                        class="w-100"
                        style="display: flex; flex-direction: column; align-items: center;"
                    >
                        <img
                            src={curBlog.image}
                            style="width:700px; height:500px; object-fit: cover; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                        />
                    </div>
                    <p class="mt-4">{curBlog.content}</p>
                </div>
            {/if}
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
