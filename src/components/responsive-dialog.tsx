"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComponentProps } from "react";

interface FormComponentProps extends ComponentProps<"form"> {
  onClose: () => void;
}

interface ResponsiveDialogProps extends ComponentProps<typeof Button> {
  label: string;
  variant?: ComponentProps<typeof Button>["variant"];
  title: string;
  description?: string;
  formComponent: React.ReactNode;
}

export function ResponsiveDialog(props: ResponsiveDialogProps) {
  const {
    label,
    title,
    description,
    variant = "default",
    formComponent,
    ...otherProps
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} {...otherProps}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div>
          {React.isValidElement(formComponent) &&
            React.cloneElement(formComponent, {
              onClose: handleClose,
            } as FormComponentProps)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
