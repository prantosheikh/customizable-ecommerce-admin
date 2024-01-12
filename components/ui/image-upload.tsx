"use client";

import { url } from "inspector";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
	disabled: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
	disabled,
	onChange,
	onRemove,
	value,
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onUpload = (result: any) => {
		onChange(result.info.secure_url);
	};

	if (!isMounted) {
		return null;
	}

	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{value.map((url) => (
					<div
						key={url}
						className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
					>
						<div className="z-10 absolute top-2 right-2">
							<Button
								variant="destructive"
								size="icon"
								type="button"
								onClick={() => onRemove(url)}
							>
								<Trash className="w-4 h-4" />
							</Button>
						</div>
						<Image
							fill
							className="image-object"
							alt="Image"
							src={url}
						/>
					</div>
				))}
			</div>
			<CldUploadWidget onUpload={onUpload} uploadPreset="ozfb4tyb">
				{({ open }) => {
					const onClick = () => {
						open();
					};

					return (
						<Button
							type="button"
							disabled={disabled}
							variant="secondary"
							onClick={onClick}
						>
							<ImagePlus className="h-4 w-4 mr-2" />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};
