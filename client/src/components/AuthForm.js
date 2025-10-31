import { Box, Button, TextField, Typography } from '@mui/material';

export default function AuthForm({ title, fields, onSubmit }) {
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 10,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" mb={2}>{title}</Typography>
      <form onSubmit={onSubmit}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || 'text'}
            onChange={field.onChange}
            fullWidth
            margin="normal"
            required
          />
        ))}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          {title}
        </Button>
      </form>
    </Box>
  );
}
