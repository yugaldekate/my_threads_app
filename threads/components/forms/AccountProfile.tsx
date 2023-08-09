"use client"

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// zod user schema validations for react-hook-form
import { UserValidation } from "@/lib/validations/user";

interface Props {
    user: {
      id: string | null;
      objectId: string | null;
      username: string | null;
      name: string | null;
      bio: string | null;
      image: string | null;
    };
    btnTitle: string | null;
}

const AccountProfile = ({user , btnTitle}:Props) => {

    //react-hook-form with zod schema for user
    const form = useForm<z.infer<typeof UserValidation>>({
            resolver: zodResolver(UserValidation),
            defaultValues: {
                profile_photo: user?.image ? user.image : "",
                name: user?.name ? user.name : "",
                username: user?.username ? user.username : "",
                bio: user?.bio ? user.bio : "",
            },
        });

        console.log("accountProfile ",user);

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
            
    };    

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void ) => {
        e.preventDefault();
    
        const fileReader = new FileReader();
    
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
        //setFiles(Array.from(e.target.files));
    
          if (!file.type.includes("image")) return;
    
          fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() || "";
            fieldChange(imageDataUrl);
          };
    
          fileReader.readAsDataURL(file);
        }
    };    

    return (
        <Form {...form}>
            <form className='flex flex-col justify-start gap-10' onSubmit={()=>{}} >

                {/* profile picture */}
                <FormField 
                    control={form.control} 
                    name='profile_photo' 
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            <FormLabel className='account-form_image-label'>
                                {field.value ? (
                                    <Image src={field.value} alt='profile_icon' width={96} height={96} priority className='rounded-full object-contain'/>
                                ) : (
                                <Image src='/assets/profile.svg' alt='profile_icon' width={24} height={24} className='object-contain'/>
                                )}
                            </FormLabel>
                            
                            {/* upload image */}
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input type='file' accept='image/*' placeholder='Add profile photo' className='account-form_image-input' onChange={(e) => handleImage(e , field.onChange)} />
                            </FormControl>
                        </FormItem>
                    )}
                />


                {/* name */}
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'> Name </FormLabel>

                            <FormControl>
                                <Input type='text' className='account-form_input no-focus' {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />


                {/* Username */}
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'> Username </FormLabel>

                            <FormControl>
                                <Input type='text' className='account-form_input no-focus' {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />


                {/* bio */}
                <FormField 
                    control={form.control} 
                    name='bio' 
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'> Bio </FormLabel>

                            <FormControl>
                                <Textarea rows={10} className='account-form_input no-focus' {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />


                {/* continue button */}
                <Button type='submit' className='bg-primary-500' > {btnTitle} </Button>
                

            </form>
        </Form>    
    )
}

export default AccountProfile