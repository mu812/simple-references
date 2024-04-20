import { styled } from "@stitches/react";

export const CustomButton = styled("button", {
    minWidth: "6rem",
    minHeight: "2.5rem",
    color: "white",
    borderRadius:"0.5rem",
    variants:{
        color:{
            blue:{
                backgroundColor: 'blueviolet',
                '&:hover': {
                    backgroundColor: 'darkviolet'
                }
            },
            green:{
                backgroundColor: "#69cf95",
                '&:hover': {
                    backgroundColor: "#2c9448"
                }
            }
        }
    }
});