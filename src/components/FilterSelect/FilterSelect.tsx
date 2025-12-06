import { FormControl, InputLabel, MenuItem, Select, InputAdornment, type SelectChangeEvent } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

type Props = {
    value: string | null;
    onChange: (value: string | null) => void;
};

const FilterSelect = ({ value, onChange }: Props) => {
    const handleChange = (event:  SelectChangeEvent) => {
        const selected = event.target.value;
        onChange(selected === "all" ? null : selected);
    };

    return (
        <FormControl
            sx={{
                width: "200px",
                "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fff4d6",
                    "& fieldset": {
                        borderColor: "saddlebrown",
                    },
                    "&:hover fieldset": {
                        borderColor: "#5C3317",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "saddlebrown",
                    },
                },
                "& .MuiInputLabel-root": {
                    color: "saddlebrown",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "saddlebrown",
                },
                "& .MuiSelect-select": {
                    color: "saddlebrown",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                }
            }}
        >
            <InputLabel id="filter-select-label">Filter by breed</InputLabel>

            <Select
                labelId="filter-select-label"
                label="Filter by breed"
                value={value ?? "all"}
                onChange={handleChange}
                startAdornment={
                    <InputAdornment position="start">
                        <PetsIcon sx={{ color: "saddlebrown", marginRight: 1 }} />
                    </InputAdornment>
                }
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: "#fffbe8",
                            borderRadius: "12px",
                            border: "2px solid #FBAD36",
                            color: "saddlebrown",
                        },
                    },
                }}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pug">Pug</MenuItem>
                <MenuItem value="chihuahua">Chihuahua</MenuItem>
                <MenuItem value="corgi">Corgi</MenuItem>
                <MenuItem value="maltipoo">Maltipoo</MenuItem>
            </Select>
        </FormControl>
    );
};

export default FilterSelect;
