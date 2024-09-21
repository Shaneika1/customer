<script lang="ts">

    import { onMount } from "svelte";
    import moment from "moment";
    import {uploadImage} from '../../lib/index'

    import {
        getUser,
        generateRandomNumber,
        generateOrderId,
        checkFields,
    } from "$lib/index";
    import supabase from "$lib/supabase";
    import swal from "sweetalert2";
    import Chat from '../../components/chat.svelte'

    let orders = []
    let worker = {}

    let loading = false;
    let section = 'table'

    let curUser = {}
    let currentOrder = null

    const setChat = (order) => {
        currentOrder = order;
        section = 'chat'
    }

    const loadInfo = async () => {
        let token = localStorage.getItem("token");
        let user = await getUser(token);
        curUser = user

        await supabase
            .from("orders")
            .select()
            .eq("email", curUser.email)
            .then((res) => {
                orders = res.data;
                console.log(orders)
            });
    };

    const uploadInvoice = async (file, id) => {
        let link = await uploadImage(file[0] , file[0].name) 
        await supabase.from("orders").update({receipt: link}).eq('id', id).then(res => {
            swal.fire('Great', 'Invoice Uploaded', 'success')
        })

        await loadInfo()
    }

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

    onMount(() => {
        loadInfo()
    })
</script>


{#if loading == false}
    <section class="guest-order-section bg-center bg-no-repeat">
        <div class="px-4 lg:mx-auto text-center pt-10 lg:py-16">
            <h3
                class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
            >
                {section == 'table' ? 'Orders' : 'Meet Your Personal Shopper'}
            </h3>
            <p
                class="mb-8 text-lg font-normal text-center text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
            >
               {section == 'table' ? 'View your current and previous orders here' : 'They will be your assistant for today'}
            </p>
        </div>        

        <div
        class="mx-1 p-5"
        style=""
    >
        {#if section == "table"}
        <div class="lg:my-5 my-10 w-full overflow-x-auto">
            <h3 class="text-2xl mb-2">Previous Orders</h3>
            <table class="lg:my-5 my-10 w-full">
                <tr>
                    <th>Order Id</th>
                    <th>Delivery Day</th>
                    <th>Delivery Time</th>
                    <th>Status</th>
                    <th>Driver</th>
                    <th># of items</th>
                    <th>Receipt</th>
                    <th>Chat</th>
                </tr>
                {#each orders as order}
                    <tr>
                        <td>{order.orderId}</td>
                        <td>{order.day}</td>
                        <td>{order.time}</td>
                        <td>{order.status}</td>
                        <td
                            >{#if order.worker}<p
                                    style="cursor:pointer; color:blue; text-decoration:underline"
                                    on:click={() =>
                                        viewDriver(order.worker)}
                                >
                                    {order.driver}
                                </p>{/if}</td
                        >
                        <td>{order.items ? order.items.length : 0}</td>
                        {#if order.receipt == null}
                            <td><input type='file' on:input={(e) => uploadInvoice(e.target.files, order.id)}  /></td>
                        {/if}

                        {#if order.receipt != null}
                        <td><a href={order.receipt}>View</a></td>
                       
                    {/if}
                    <td><button on:click={() => setChat(order.id)} class="mt-2 confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >Chat</button></td>
                    </tr>
                {/each}
            </table>
        </div>
    {/if}

    {#if section == "driver"}

                <div class="lg:my-5 my-10 lg:mx-10">
                    <button
                        on:click={() => section = 'table'}
                        class=" confirm-buttons mb-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >Back</button
                    >
                    <h1>{worker.firstname + " " + worker.lastname}</h1>
                    <img
                        src={worker.image}
                        class='my-3'
                        style="width:300px; height:200px; object-fit: cover; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                    />
                    <p>{worker.bio}</p>
                </div>
            {/if}

    {#if section == 'chat'}
                <Chat orderId={currentOrder} back={() => section = 'table'}/>
    {/if}
    </div>
    </section>
{/if}        