// ./modals/EditModal.jsx
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Box,
} from "@mui/material";
import API from "../../api/api";
import { useNotification } from "../../context/NotificationContext";

export default function EditModal({ 
  isOpen, 
  onClose, 
  entityName,   // e.g. "event" or "user"
  data,         // current record to edit
  fields,       // array of { name, label, type }
  endpoint,     // e.g. `/api/events` or `/api/users`
  onSave        // callback after successful update
}) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  console.log("EditModal", isOpen, data, fields, endpoint)
  const { notify } = useNotification();

  useEffect(() => {
     if (data) {
      const newForm = { ...data };

      // For time fields
      ["start_time", "end_time"].forEach((field) => {
        if (data[field]) {
          // Combine with date for proper Dayjs parsing
          newForm[field] = dayjs(`${data.date}T${data[field]}`);
        }
      });

      setFormData(newForm);
      console.log("newForm", newForm)
    }
      }, [data, fields]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data.id)

    try {
      const payload = {
        ...formData,
        start_time: formData.start_time?.format("HH:mm:ss"),
        end_time: formData.end_time?.format("HH:mm:ss"),
      };

      const res = await API.put(`events/${data.id}`, payload, { withCredentials: true });
      console.log("res",res);

      notify("Event created successfully!", "success");
      onSave();
      onClose();
    } catch (err) {
      console.error(`Error updating ${entityName}:`, err.message);
      notify("Failed to update event", "error");
      alert(`Failed to update ${entityName}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit {entityName}</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {fields.map((f) => {
          const value = formData[f.name] ? dayjs(formData[f.name]) : null;
          // const value = formData[f.name] ?? "";

            // Date Picker
            if (f.type === "date") {
              return (
                <DatePicker
                  key={f.name}
                  label={f.label}
                  value={value}
                  onChange={(newVal) =>
                    setFormData((prev) => ({
                      ...prev,
                      [f.name]: newVal ? newVal.format("YYYY-MM-DD") : "",
                    }))
                  }
                />
              );
            }

              // Time picker
              if (f.type === "time") {
                console.log("inside type time", f.name, f.label, value, formData[f.name])
                return (
                  <TimePicker
                    key={f.name}
                    label={f.label}
                    value={formData[f.name]}
                    onChange={(newVal) =>
                      setFormData((prev) => ({ ...prev, [f.name]: newVal }))
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                );
              }

            // Select dropdown
            if (f.type === "select") {
              return (
                <FormControl fullWidth key={f.name}>
                  <InputLabel>{f.label}</InputLabel>
                  <Select
                    value={value}
                    label={f.label}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [f.name]: e.target.value }))
                    }
                  >
                    {f.options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }

            // Default Text Fields
            return (
              <TextField
                key={f.name}
                label={f.label}
                name={f.name}
                type={f.type || "text"}
                value={formData[f.name] ?? ""}
                onChange={handleChange}
                fullWidth
                multiline={f.multiline || false}
                rows={f.rows || 1}
                variant="outlined"
              />
            );
          })}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
    </LocalizationProvider>
  );
}
