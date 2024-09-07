<script lang="ts">
    import { onMount } from "svelte";
    import swal from "sweetalert2";

    import moment from "moment";
    import { getUser } from "$lib/index";
    import supabase from "$lib/supabase";
    export let orderId;
    export let back;

    let messages = [];
    let loading = true;
    let user = {};
    let text = "";
    let room = orderId
    const channel = supabase.channel(room);

    const send = async (e) => {
        e.preventDefault();
        await supabase
            .from("messages")
            .insert({ message: text, orderId, from: user })
            .then((res) => {
                loadData();
                text = ""
                // const scrollableDiv = document.getElementById('scrollable-div');

                // // Scroll to the bottom of the div
                // scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
            });

        supabase
            .channel(room)
            .send({
                type: "broadcast",
                event: "cursor-pos",
                payload: { x: Math.random(), y: Math.random() },
            })
            .then((res2) => {
                // console.log(res2);
            });
    };

    const loadData = async () => {
        user = await getUser(localStorage.getItem("token"));
        console.log(orderId);
        await supabase
            .from("messages")
            .select()
            .order('id', { ascending: true })
            .eq("orderId", orderId)
            .then((res) => {
                messages = res.data;
                loading = false;

            }).then(res=> {
                loading = false
                // const scrollableDiv = document.getElementById('scrollable-div');

                // // Scroll to the bottom of the div
                // scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
            });

            const scrollableDiv = document.getElementById('scrollable-div');

            // Scroll to the bottom of the div
            scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        
    };

    onMount(() => {
        loadData();

        channel
            .on("broadcast", { event: "cursor-pos" }, (payload) => {
                // console.log("Cursor position received!", payload);
                loadData()
                // const scrollableDiv = document.getElementById('scrollable-div');

                // // Scroll to the bottom of the div
                // scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
            })
            .subscribe((status) => {
                if (status === "SUBSCRIBED") {
                    // channel.send({
                    //     type: "broadcast",
                    //     event: "cursor-pos",
                    //     payload: { x: Math.random(), y: Math.random() },
                    // });
                }
            });
    });
</script>

{#if loading == false}
    <div class="mt-10 m-10">
        <p class="text-2xl">Chat Room</p>
        <small>Speak to customers here</small>

        <div class="lg:grid lg:grid-cols-2 mt-5">
            <div>
                <div class="border-2 p-5 overflow-auto"  style="max-height:500px; " id="scrollable-div">
                    {#each messages as message}
                        {#if message.from.id == user.id}
                            <div class="flex justify-end">
                                <div
                                    class="bg-blue-500 my-3 text-white p-4 rounded-lg shadow-md"
                                >
                                    <p class="text-lg">
                                        {message.from.firstname}
                                        {message.from.lastname}
                                    </p>
                                    <p
                                        class="text-sm bg-transparent border-none focus:outline-none"
                                    >
                                        {message.message}
                                    </p>
                                    <small
                                        >{moment(message.created_at).format(
                                            "MMMM Do YYYY, h:mm:ss a",
                                        )}</small
                                    >
                                </div>
                            </div>
                        {/if}

                        {#if message.from.id != user.id}
                            <div class="flex justify-start">
                                <div
                                    class="bg-green-500 my-3 text-white p-4 rounded-lg shadow-md"
                                >
                                    <p class="text-lg">
                                        {message.from.firstname}
                                        {message.from.lastname}
                                    </p>
                                    <p
                                        class="text-sm bg-transparent border-none focus:outline-none"
                                    >
                                        {message.message}
                                    </p>
                                    <small
                                        >{moment(message.created_at).format(
                                            "MMMM Do YYYY, h:mm:ss a",
                                        )}</small
                                    >
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
                <form on:submit={(e) => send(e)} class="grid grid-col-5">
                    <input
                        type="text"
                        class="border-3 mt-2 p-3 col-span-3"
                        bind:value={text}
                    />
                    <button
                        type='submit'
                        class="mt-2 confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >Send</button
                    >
                </form>
            </div>
        </div>
    </div>
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
