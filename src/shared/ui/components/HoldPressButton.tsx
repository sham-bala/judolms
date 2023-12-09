"use client";
import * as React from "react";
import { useLongPress } from "@uidotdev/usehooks";
import clsx from "clsx";

type HoldPressButtonProps = {
  isChecked: boolean;
  callback: () => void;
};

export default function HoldPressButton(props: HoldPressButtonProps) {
  const { isChecked, callback } = props;
  const attrs = useLongPress(
    () => {
      console.log("!isChecked", !isChecked);
      callback();
      console.log("fired event");
    },
    {
      onStart: (event) => {
        event.preventDefault();
        console.log("Press started");
      },
      onFinish: (event) => console.log("Press Finished"),
      onCancel: (event) => console.log("Press cancelled"),
      threshold: 100,
    }
  );

  const actived =
    "border bg-primary text-primary-foreground  shadow hover:bg-primary/90";
  const inactived =
    "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground";
  return (
    <button
      {...attrs}
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2",
        isChecked ? actived : inactived
      )}
      type="submit"
    >
      {isChecked ? "Присутствует" : "отсутствуют"}
    </button>
  );
}
