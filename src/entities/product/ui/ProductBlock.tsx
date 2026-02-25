import { useParams, Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Rating,
  Divider,
  CircularProgress,
  Button,
  ImageList,
  ImageListItem,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useGetProductQuery } from "../../../features/getProducts/api/productApi.ts";

const ProductBlock = () => {
  const params = useParams();
  const { data, isLoading, error } = useGetProductQuery(Number(params.id!));
  const [selectedImage, setSelectedImage] = useState<string>("");

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" color="error">
          Ошибка загрузки продукта
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Вернуться к списку
        </Button>
      </Box>
    );
  }

  const mainImage = selectedImage || data.thumbnail;

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: "0 auto" }}>
      <Button component={Link} to="/products" variant="outlined" sx={{ mb: 3 }}>
        ← Назад к списку
      </Button>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardMedia
              component="img"
              image={mainImage}
              alt={data.title}
              sx={{ height: 400, objectFit: "contain", p: 2 }}
            />
          </Card>
          {data.images && data.images.length > 0 && (
            <ImageList sx={{ mt: 2 }} cols={4} rowHeight={100}>
              {data.images.map((img, index) => (
                <ImageListItem
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    cursor: "pointer",
                    border:
                      selectedImage === img ? "2px solid #1976d2" : "none",
                  }}
                >
                  <img src={img} alt={`${data.title} ${index + 1}`} />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" gutterBottom>
            {data.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Rating value={data.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({data.rating})
            </Typography>
          </Box>

          <Typography variant="h5" color="primary" gutterBottom>
            ${data.price}
          </Typography>

          {data.discountPercentage > 0 && (
            <Chip
              label={`-${data.discountPercentage}%`}
              color="secondary"
              size="small"
              sx={{ mb: 2 }}
            />
          )}

          <Typography variant="body1" sx={{ mb: 2 }}>
            {data.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Категория:
              </Typography>
              <Typography variant="body1">{data.category}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Бренд:
              </Typography>
              <Typography variant="body1">{data.brand || "—"}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                В наличии:
              </Typography>
              <Typography variant="body1">{data.stock} шт.</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Статус:
              </Typography>
              <Chip
                label={data.availabilityStatus}
                color={data.stock > 0 ? "success" : "error"}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                SKU:
              </Typography>
              <Typography variant="body1">{data.sku}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Вес:
              </Typography>
              <Typography variant="body1">{data.weight} кг</Typography>
            </Grid>
          </Grid>

          {data.tags && data.tags.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Теги:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {data.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Дополнительная информация
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Габариты (Ш×В×Г):
                  </Typography>
                  <Typography variant="body1">
                    {data.dimensions.width} × {data.dimensions.height} ×{" "}
                    {data.dimensions.depth} см
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Гарантия:
                  </Typography>
                  <Typography variant="body1">
                    {data.warrantyInformation}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Доставка:
                  </Typography>
                  <Typography variant="body1">
                    {data.shippingInformation}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Политика возврата:
                  </Typography>
                  <Typography variant="body1">{data.returnPolicy}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Минимальный заказ:
                  </Typography>
                  <Typography variant="body1">
                    {data.minimumOrderQuantity} шт.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {data.reviews && data.reviews.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Отзывы ({data.reviews.length})
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {data.reviews.map((review, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Rating value={review.rating} size="small" readOnly />
                      <Typography variant="body2" fontWeight="bold">
                        {review.reviewerName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.date).toLocaleDateString("ru-RU")}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{review.comment}</Typography>
                    {index < data.reviews.length - 1 && (
                      <Divider sx={{ mt: 2 }} />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProductBlock;
