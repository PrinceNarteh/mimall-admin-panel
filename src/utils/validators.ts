import { Admin, DeliveryCompany } from "@custom-types/index";
import { z } from "zod";

export const adminResolver = (admin: Admin | undefined) => {
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
    role: z.string({ required_error: "role is required" }),
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
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const deliveryCompanyResolver = (
  deliveryCompany: DeliveryCompany | undefined
) => {
  const schema = z.object({
    name: z
      .string({ required_error: "First name is required" })
      .min(1, "First name is required"),
    email: z.string().email("Please enter a valid email"),
    phone_number: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Please enter a valid phone number")
      .max(13, "Please enter a valid phone number"),
    alternate_phone_number: z.union([
      z
        .string({ required_error: "Phone number is required" })
        .min(10, "Please enter a valid phone number")
        .max(13, "Please enter a valid phone number"),
      z.undefined(),
    ]),
    whatsapp_number: z
      .string({ required_error: "Whatsapp number is required" })
      .min(10, "Please enter a valid phone number")
      .max(13, "Please enter a valid phone number"),
    location: z
      .string({ required_error: "Location is required" })
      .min(1, "Location is required"),
    ownerFirstName: z
      .string({ required_error: "Owner's first name is required" })
      .min(1, "Owner's first name is required"),
    ownerLastName: z
      .string({ required_error: "Owner's last name is required" })
      .min(1, "Owner's last name is required"),
    ownerPhoneNumber: z
      .string({ required_error: "Owner's phone number is required" })
      .min(1, "Owner's phone number is required"),
    slide_images: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
  });

  if (!deliveryCompany) {
    return schema
      .extend({
        password: z.string().min(6, "Passwords must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Please confirm your password"),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
      });
  }

  return schema;
};
