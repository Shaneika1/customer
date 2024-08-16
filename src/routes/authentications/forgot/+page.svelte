<script lang="ts">
    import { checkFields, checkEmail } from "../../../lib/index";
    import swal from "sweetalert2";
    import b from "crypto-js";
    import supabase from "../../../lib/supabase";

    let firstname: string = "";
    let lastname: string = "";
    let email: string = "";
    let phone: string = "";
    let password: string = "";
    let cPassword: string = "";

    function removeSlashes(str) {
        return str.replace(/[\/\\]/g, '');
    }

    const sendEmail = async () => {
        let flag = await checkEmail(email);
        
        let hash2 = (Math.random() * 1000000).toString();
        
        if (flag == false) {
            if (checkFields({ email }) == true) {
                await supabase
                    .from("emails")
                    .insert({ email, type: "recover", recoveryToken: hash2 })
                    .then(async (res) => {
                        // swal.fire("Success", "Email was send", "success");

                        await supabase
                            .from("customers")
                            .update({ recoveryToken: hash2 })
                            .eq("email", email)
                            .then((res) => {
                                swal.fire(
                                    "Success",
                                    "Check your email for more instructions",
                                    "success",
                                );
                            });
                    });
            } else {
                swal.fire("Oops", "Please enter data in all fields", "error");
            }
        } else {
            swal.fire("Oops", "Email doesn't exist", "error");
        }
    };
</script>

<div class=" flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h3
            class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 header"
        >
            Enter your email
        </h3>
        <form>
            <div class="mb-4">
                <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >Email</label
                >
                <input
                    type="email"
                    id="email"
                    bind:value={email}
                    name="email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div class="flex items-center justify-between">
                <button
                    on:click={() => sendEmail()}
                    class=" confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >Send Email</button
                >
            </div>
        </form>
    </div>
</div>
