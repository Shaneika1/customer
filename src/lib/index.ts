
// place files you want to import through the `$lib` alias in this folder.

import supabase from './supabase'

export function generateRandomNumber(): number {
    return Math.random();
}

export async function checkLogin() { 
    let token = localStorage.getItem('token');
    let data = await supabase.from('customers').select().eq('token', token)
    if(data.data?.length == 0) {
        window.location.href = '/'
    }
}

export async function generateOrderId(): Promise<number> {
    let orderId:number = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
 
    while(true) {
        let data = await supabase.from('orders').select().eq('orderId', orderId)
        if(data.data?.length == 0) {
            break
        } 

        orderId = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

    }

    return orderId;
}

export async function checkEmail (email:string): Promise<boolean>  {
    let data = await supabase.from("users").select().eq("email", email)
    if (data.data.length > 0) {
        return false
    }

    return true
}

export function checkFields(fields:any): boolean {
    for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
            console.log(fields[key])
            if(fields[key].length == 0 ) {
                return false;
            }
        }
    }

    return true
}