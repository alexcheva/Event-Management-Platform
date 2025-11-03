import { Masonry } from "@mui/lab";
import { Box, Typography, Card, CardContent, CardActions, Chip, Button, Divider, Stack } from "@mui/material";import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function ShowTickets() {
  const tickets = 
  [
    {
      "id": 1,
      "event_id": 1,
      "user_id": 4,
      "ticket_type_id": 1,
      "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKtSURBVO3BQY7DVgwFwX6E7n/lziy5+oAg2XEYVsU/rDGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1y8VASvknljiTcodIl4ZtUnijWKMUapVijXLxM5U1JuCMJJypPqLwpCW8q1ijFGqVYo1x8WBLuULkjCZ1Kl4QuCScqdyThDpVPKtYoxRqlWKNcDJOETqVLwmTFGqVYoxRrlIthVLokdCpdEiYp1ijFGqVYo1x8mMovSUKn8oTKLynWKMUapVijXLwsCb9MpUtCp3KShF9WrFGKNUqxRol/+A9LQqfyf1asUYo1SrFGuXgoCZ1Kl4Q3qXQqXRLuUDlJwptUPqlYoxRrlGKNcvFhKl0S7lDpktCpdConSeiS0Kl0KidJ6FS6JJwkoVN5olijFGuUYo1y8WFJOFE5SUKncpKETqVT6ZJwRxJOknCShE7lTcUapVijFGuUi5cloVPpknCShE7lJAknSbgjCScqXRI6lZMkfFKxRinWKMUa5eJlKl0STpLQqXRJ6FROVO5IQqdykoSTJHQq31SsUYo1SrFGiX/4D0vCHSpdEk5UuiScqPybijVKsUYp1ijxDw8k4ZtUnkhCp9Il4UTllxVrlGKNUqxRLl6m8qYknCThRKVTeSIJncpJEjqVLgmdyhPFGqVYoxRrlIsPS8IdKk+odEk4UelUTpJwh8qJypuKNUqxRinWKBfDJKFTOUlCp3JHEjqVLgmdyicVa5RijVKsUS6GUemS0KnckYRO5ZcVa5RijVKsUS4+TOWTVE5UvikJdyShU3miWKMUa5RijXLxsiR8UxLuULlDpUvCicodKm8q1ijFGqVYo8Q/rDGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo3yD5fIBPq0mE3uAAAAAElFTkSuQmCC",
      "created_at": "2025-11-02 23:11:42.522434"
    },
    {
      "id": 2,
      "event_id": 1,
      "user_id": 4,
      "ticket_type_id": 2,
      "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKiSURBVO3BQW7sWAwEwUxC979yjZdcPUCQur/NYYT5wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFw+pfFMSOpU3JaFT+aYkPFGsUYo1SrFGuXhZEt6kcpKEE5UuCZ3KHUl4k8qbijVKsUYp1igXH6ZyRxKeUOmS0Km8SeWOJHxSsUYp1ijFGuXij1PpktCpdEnoVCYp1ijFGqVYo1wMl4T/k2KNUqxRijXKxYcl4V9SOUnCE0n4TYo1SrFGKdYoFy9T+c2S0Kl0SThR+c2KNUqxRinWKOYHf5jKm5LwlxVrlGKNUqxRLh5S6ZJwh0qXhE7ljiScqHRJ6FTelIQTlS4JTxRrlGKNUqxRzA8+SOWOJJyodEk4UfmmJHQqJ0l4U7FGKdYoxRrl4iGVkyR0KneonKg8kYQTlZMknCShU/mkYo1SrFGKNcrFh6l0SehUTpLQqZwkoVPpknCicpKEE5V/qVijFGuUYo1y8VASOpUnVE6S0Kk8odIl4Q6VkyScqHRJeKJYoxRrlGKNcvGyJNyRhE9KwhMqXRJOknCi8knFGqVYoxRrlIuHVL4pCScqJ0k4UXlC5SQJn1SsUYo1SrFGuXhZEt6kcpKETqVLQqdyRxI6lTuScKLSJeGJYo1SrFGKNcrFh6nckYQ7VE5UTpJwRxKeUPmkYo1SrFGKNcrFH5eETqVLwonKSRJOVLokdCrfVKxRijVKsUa5GCYJncpJEk5UuiScqHRJ+KZijVKsUYo1ysWHJeFfSkKn8klJuEOlS8ITxRqlWKMUa5SLl6l8k0qXhJMkdCrfpPJJxRqlWKMUaxTzgzVGsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxR/gMn1O7+UStyKgAAAABJRU5ErkJggg==",
      "created_at": "2025-11-02 23:14:37.535531"
    },
    {
      "id": 3,
      "event_id": 1,
      "user_id": 4,
      "ticket_type_id": 2,
      "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKjSURBVO3BQW7kQAwEwSxC//9yro88NSBIM2sTjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJPKE0k4UemS8E0qTxRrlGKNUqxRLl6m8qYk3JGETuVNKm9KwpuKNUqxRinWKBcfloQ7VO5IwkkSOpU3JeEOlU8q1ijFGqVYo1wMo3JHEjqVv6xYoxRrlGKNcjFcEjqVyYo1SrFGKdYoFx+m8k1J6FS6JHQqT6j8JsUapVijFGuUi5cl4X9S6ZLQqXRJ6FROkvCbFWuUYo1SrFEuHlL5y1ROVP6SYo1SrFGKNUr8wQNJ6FS6JLxJ5YkkdConSXiTyicVa5RijVKsUS6+TOWJJJyodEk4SUKncqLSJaFT6ZJwkoRO5YlijVKsUYo1ysXLkvCmJHQqJ0k4UemScKLSJeEkCSdJ6FTeVKxRijVKsUa5eJnKSRI6lROVLgmdSqdykoQnVLokdConSfikYo1SrFGKNcrFhyXhJAnfpNIl4SQJdyShU/mmYo1SrFGKNUr8wR+WhE7ljiS8SeV/KtYoxRqlWKNcPJSEb1LpVLokdCpdEjqVkyR0Kr9ZsUYp1ijFGuXiZSpvSsJJEjqVLgmdyhNJ6FROktCpdEnoVJ4o1ijFGqVYo1x8WBLuUHkiCZ1Kl4RO5USlS8IdKicqbyrWKMUapVijXAyXhE6lS0KnckcSOpUuCZ3KJxVrlGKNUqxRLoZR6ZJwRxJOVH6zYo1SrFGKNcrFh6l8ksqJyh0qXRLuSMIdSehUnijWKMUapVijXLwsCd+UhDtU7lDpknCicofKm4o1SrFGKdYo8QdrjGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYo/wD3cj96aA6AJUAAAAASUVORK5CYII=",
      "created_at": "2025-11-02 23:21:34.666455"
    }
  ];
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        All Tickets
      </Typography>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {tickets.map((ticket) => (
         <Card key={ticket.id} sx={{ mt: 2, textAlign: "center", p:2 }}>
          <CardContent>
          <Typography variant="h6">Ticket {ticket.id}
              </Typography>
          {/* <Typography>{event.name} — {ticket.type}</Typography>  */}
          <img src={ticket.qr_code} alt="Ticket QR" style={{ width: 200 }} />
          </CardContent>
        </Card>
        ))}
      </Masonry>
    </Box>
  );
}
