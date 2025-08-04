import z from "zod";

export const createSubjectSchema = z.object({
    name: z.string().min(1, "Name is required"),
    englishName: z.string().min(1, "English Name is required"),
    description: z.string().min(1, "Description is required"),
    code: z
			.string()
			.min(1, "Code is required")
			.regex(/^[A-Z]{2,}$/, "Code must be uppercase letters only"),
	})
	.strict(); // strict là để chặn không được thêm trường nào vào đây nữa . ở đây nó có nghĩa là chỉ cho nhập 3 trường kia thôi nếu không nó sẽ bị lỗi validate

export const updateSubjectSchema = z
	.object({
		name: z.string().min(1, "Name is required").optional(),
    englishName: z.string().min(1, "English Name is required").optional(),

		description: z.string().min(1, "Description is required").optional(),
		code: z
			.string()
			.min(1, "Code is required")
			.regex(/^[A-Z]{2,}$/, "Code must be uppercase letters only")
			.optional(),
	})
	.strict()
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field must be provided for update",
	});
