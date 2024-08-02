<script lang='ts'>
    // import {sendEmail} from '$lib/index'
    import swal from 'sweetalert2';

    let email:string = ''

    const send = async () => {
        let flag = await sendEmail(email)
        if(flag == true) {
            swal.fire('Great!', 'Recovery email send.', 'success')
        } else {
            swal.fire('Oops', 'An error has occured', 'error')
        }
    }


</script>

<div class=' flex items-center justify-center'>
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8 ">
        <h1
        class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900  header"
    >
        Password Recovery

    </h1>
        <p  class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text">Enter email of your account</p>
        <form >
            
            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" bind:value={email}  name="email"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            
            <div class="flex items-center justify-between">
                <button  on:click={() => send()}  class=" confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                <a href="/authentications/register" class="links inline-block align-baseline font-bold text-sm ">Don't have an account? Click here?</a>
            </div>
        </form>
    </div>
    </div>