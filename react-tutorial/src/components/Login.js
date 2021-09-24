import React from "react";
import { TextField, Button } from "@material-ui/core";


export default function Login() {
    <form>
        <TextField
            label="email"
            variant="outlined"
            value={email}
            required
            fullWidth
            // id="email"
            // name="email"
            // autoComplete="email"
            onChange={(e) => {
                setEmail(e.target.value)
            }}
        >
        </TextField>
        <TextField>

        </TextField>
    </form>
}