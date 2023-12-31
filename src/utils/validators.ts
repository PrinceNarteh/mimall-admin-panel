import { Admin, Shop } from "@custom-types/index";
import { z } from "zod";

const MAX_FILE_SIZE = 500000;

const image = (path: string) =>
  z.instanceof(File).superRefine((val, ctx) => {
    if (val?.size >= MAX_FILE_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Max image size is 5MB.",
        path: [path],
      });
    }
  });

export const adminResolver = (admin: Admin | null) => {
  const schema = z.object({
    first_name: z
      .string({ required_error: "First name is required" })
      .min(1, "First name is required"),
    last_name: z
      .string({ required_error: "Last name is required" })
      .min(1, "Last name is required"),
    middle_name: z.union([z.string(), z.undefined()]),
    phone_number: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Please enter a valid phone number")
      .max(13, "Please enter a valid phone number"),
    alternate_phone_number: z.union([z.string(), z.undefined()]),
    email: z.string().email("Please enter a valid email"),
    address: z.union([z.string(), z.undefined()]),
    nationality: z.union([z.string(), z.undefined()]),
    profile_image: z.any(),
    card_type: z.union([z.string(), z.undefined()]),
    card_number: z.union([z.string(), z.undefined()]),
    active: z.boolean().default(true),
  });

  if (!admin) {
    return schema
      .extend({
        password: z.string().min(6, "Passwords must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Please confirm your password"),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
      })
      .superRefine((val, ctx) => {
        if (val.card_type && !val.card_number) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please kindly provide a card number",
            path: ["card_number"],
          });
        }

        if (val.card_type === "" && val.card_number !== "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You can't add card number without a card type",
            path: ["card_number"],
          });
        }
      });
  }

  return schema.superRefine((val, ctx) => {
    if (val.card_type && !val.card_number) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please kindly provide a card number",
        path: ["card_number"],
      });
    }

    if (val.card_type === "" && val.card_number !== "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You can't add card number without a card type",
        path: ["card_number"],
      });
    }
  });
};

export const updateDeliveryCompanyResolver = z
  .object({
    name: z
      .string({ required_error: "Company's name is required" })
      .min(1, "Company's name is required"),
    email: z.string().email("Please enter a valid email"),
    phone_number: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Please enter a valid phone number")
      .max(13, "Please enter a valid phone number"),
    alternate_phone_number: z.string().optional(),
    whatsapp_number: z
      .string({ required_error: "Whatsapp number is required" })
      .min(10, "Please enter a valid phone number")
      .max(13, "Please enter a valid phone number"),
    location: z
      .string({ required_error: "Location is required" })
      .min(1, "Location is required"),
    owner_first_name: z
      .string({ required_error: "Owner's first name is required" })
      .min(1, "Owner's first name is required"),
    owner_last_name: z
      .string({ required_error: "Owner's last name is required" })
      .min(1, "Owner's last name is required"),
    owner_phone_number: z
      .string({ required_error: "Owner's phone number is required" })
      .min(1, "Owner's phone number is required"),
    slide_images: z.union([
      z
        .array(image("slide_images"))
        .min(1, "Please provide at least one image"),
      z.string().array(),
    ]),
    logo: z.union([image("logo"), z.string(), z.undefined()]),
  })
  .superRefine((val, ctx) => {
    if (val.phone_number.length !== 13) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid phone number",
        path: ["phone_number"],
      });
    }

    if (
      val.alternate_phone_number &&
      val.alternate_phone_number.length !== 13
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid phone number",
        path: ["alternate_phone_number"],
      });
    }
  });

export const createDeliveryCompanyResolver = z
  .object({
    name: z
      .string({ required_error: "Company's name is required" })
      .min(1, "Company's name is required"),
    email: z.string().email("Please enter a valid email"),
    phone_number: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Please enter a valid phone number")
      .max(13, "Please enter a valid phone number"),
    alternate_phone_number: z.string().optional(),
    whatsapp_number: z
      .string({ required_error: "Whatsapp number is required" })
      .min(10, "Please enter a valid phone number")
      .max(13, "Please enter a valid phone number"),
    location: z
      .string({ required_error: "Location is required" })
      .min(1, "Location is required"),
    owner_first_name: z
      .string({ required_error: "Owner's first name is required" })
      .min(1, "Owner's first name is required"),
    owner_last_name: z
      .string({ required_error: "Owner's last name is required" })
      .min(1, "Owner's last name is required"),
    owner_phone_number: z
      .string({ required_error: "Owner's phone number is required" })
      .min(1, "Owner's phone number is required"),
    slide_images: z.union([
      z
        .array(image("slide_images"))
        .min(1, "Please provide at least one image"),
      z.string().array(),
    ]),
    logo: z.union([image("logo"), z.string(), z.undefined()]),
    password: z.string().min(6, "Passwords must be at least 6 characters"),
    confirm_password: z.string().min(6, "Please confirm your password"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        params: ["confirm_password"],
      });
    }

    if (val.phone_number.length !== 13) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid phone number",
        path: ["phone_number"],
      });
    }

    if (
      val.alternate_phone_number &&
      val.alternate_phone_number.length !== 13
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid phone number",
        path: ["alternate_phone_number"],
      });
    }
  });

export const productResolver = z.object({
  title: z
    .string({ required_error: "Product name is required" })
    .min(1, "Product name is required"),
  description: z
    .string({ required_error: "Product description is required" })
    .min(1, "Product description is required"),
  price: z.coerce.number({ required_error: "Product price is required" }),
  stock: z.coerce.number({ required_error: "Product price is required" }),
  discount_percentage: z.number({
    required_error: "Product price is required",
  }),
  brand: z
    .string({ required_error: "Product brand must be provided" })
    .min(1, "Product brand must be provided"),
  category: z
    .string({ required_error: "Please kindly select product category" })
    .min(1, "Please kindly select product category"),
  product_images: z.union([
    z.array(image("product_images")),
    z.string().array(),
  ]),
  shopId: z
    .string({ required_error: "Please select shop" })
    .min(1, "Please select shop"),
});

export const shopResolver = (shop: Shop | null) =>
  z.object({
    name: z
      .string({ required_error: "Shop name is required" })
      .min(1, "Shop name is required"),
    description: z
      .string({ required_error: "Shop description is required" })
      .min(1, "Shop description is required"),
    location: z
      .string({ required_error: "Location is required" })
      .min(1, "Location is required"),
    map_direction: z
      .string({ required_error: "Map direction is required" })
      .min(1, "Map direction is required"),
    phone_number: z
      .string({ required_error: "Phone number is required" })
      .min(1, "Phone number is required"),
    alternate_phone_number: z.string({ required_error: "is required" }),
    whatsapp_number: z
      .string({ required_error: "is required" })
      .min(1, "is required"),
    instagram_handle: z.string({ required_error: "is required" }).optional(),
    facebook_handle: z.string({ required_error: "is required" }).optional(),
    twitter_handle: z.string({ required_error: "is required" }).optional(),
    tiktok_handle: z.string({ required_error: "is required" }).optional(),
    opening_time: z
      .string({ required_error: "is required" })
      .min(1, "is required"),
    closing_time: z
      .string({ required_error: "is required" })
      .min(1, "is required"),
    profile_image: z.any(),
    banner: z.any(),
  });
