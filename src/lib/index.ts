
// place files you want to import through the `$lib` alias in this folder.

import supabase from './supabase'

export function generateRandomNumber(): number {
    return Math.random();
}

export function  randomizeAndRemoveSpaces(input: string): string {
    // Regex to match common image file extensions
  const extensionRegex = /\.(jpeg|jpg|png)$/i;
  const match = input.match(extensionRegex);

  let baseName = input;
  let extension = '';

  if (match) {
    // Extract the extension
    extension = match[0];
    // Remove the extension from the base name
    baseName = input.slice(0, -extension.length);
  }

  // Remove all spaces from the base name
  const noSpaces = baseName.replace(/\s+/g, '');

  // Convert the string to an array of characters
  const charArray = noSpaces.split('');

  // Shuffle the array of characters using Fisher-Yates algorithm
  for (let i = charArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
  }

  // Join the shuffled characters back into a string
  const randomizedName = charArray.join('');

  // Append the extension if it exists
  return randomizedName + extension;

}

export async function uploadImage(file:any, name:string): Promise<any> {
    let {data, error} = await supabase.storage.from('images').upload(`/${randomizeAndRemoveSpaces(name)}`, file, {
        cacheControl: '3600',
        upsert: false
    })
    console.log(error)
    return `https://vqhobmiymmgdiwcsytdn.supabase.co/storage/v1/object/public/${data?.fullPath}`
}

export async function checkLogin() { 
    let token = localStorage.getItem('token');
    let data = await supabase.from('customers').select().eq('token', token)
    if(data.data?.length == 0) {
        window.location.href = '/'
    }
}

export async function getUser(token:string): Promise<any> {
    let data = await supabase.from('customers').select().eq('token', token)
    if(data.data?.length == 0) {
        window.location.href = '/'
    }
    return data.data[0]
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

export async function generateSubId(): Promise<number> {
    let Id:number = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
 
    while(true) {
        let data = await supabase.from('customers').select().eq('subId', Id)
        if(data.data?.length == 0) {
            break
        } 

        Id = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

    }

    return Id;
}

export async function checkEmail (email:string): Promise<boolean>  {
    let data = await supabase.from("customers").select().eq("email", email)
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