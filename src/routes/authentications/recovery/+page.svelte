<script lang="ts">
    import { checkFields, checkEmail } from "../../../lib/index";
    import swal from "sweetalert2";
    import b from "crypto-js";
    import { onMount } from "svelte";
    import supabase from "../../../lib/supabase";

    let firstname: string = "";
    let lastname: string = "";
    let email: string = "";
    let phone: string = "";
    let password: string = "";
    let cPassword: string = "";
    let token:string = "";

    const getParams = async () => {
        // Get the query parameters from the current URL
        const params = new URLSearchParams(window.location.search);

        // Convert parameters to an object
        const paramsObj = {};
        for (const [key, value] of params) {
            paramsObj[key] = value;
        }


        token = paramsObj.token
        
    };

    const save = async () => {
        if (checkFields({ password, cPassword }) == true) {
           if(password == cPassword) {

                let hash1 = b.AES.encrypt(password, 'efdafdsdfdsd').toString();
                await supabase.from('customers').update({password: hash1}).eq('recoveryToken', token).then(async res => {
                    await supabase.from('customers').update({recoveryToken: ''}).eq('recoveryToken', token).then(res2 => {
                        swal.fire("Success", "New Password successfully created", "success");
                    })
               
                })
           } else {
                swal.fire("Oops", "Please make sure passwords match", "error");
           } 
            
        } else {
            swal.fire("Oops", "Please enter data in all fields", "error");
        }
    };

    const signIn = async (response) => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `/auth/callback`,
            },
        });
    };

    onMount(() => {
        getParams()
    })
    
</script>

<div class=" flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h3
            class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 header"
        >
            Create new Password
        </h3>
        <form>
            <div class="mb-4">
                <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >Password</label
                >
                <input
                    type="text"
                    id="email"
                    bind:value={password}
                    name="email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div class="mb-6">
                <label
                    for="password"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >Confirm Password</label
                >
                <input
                    type="password"
                    id="password"
                    bind:value={cPassword}
                    name="password"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />

            </div>

            <div class="flex items-center justify-between">
                <button
                    on:click={() => save()}
                    class=" confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >Save Password</button
                >
                
            </div>
        </form>
    </div>
</div>
