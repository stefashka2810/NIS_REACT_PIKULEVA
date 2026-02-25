import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  CircularProgress,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Grid,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store/store.ts";
import {
  useGetProductsQuery,
  useSearchProductsQuery,
} from "../api/productApi.ts";

const ProductsInfo = () => {
  const { t } = useTranslation();
  const catalogPageSize = useSelector(
    (state: RootState) => state.settings.catalogPageSize,
  );

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(catalogPageSize);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    if (catalogPageSize !== limit) {
      setLimit(catalogPageSize);
      setSkip(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogPageSize]);

  const { data: allData, isLoading: isLoadingAll } = useGetProductsQuery(
    { limit, skip },
    { skip: searchStr.length > 0 },
  );

  const { data: searchData, isLoading: isLoadingSearch } =
    useSearchProductsQuery(searchStr, { skip: searchStr.length === 0 });

  const currentData = useMemo(() => {
    if (searchStr.length > 0) {
      return searchData;
    }
    return allData;
  }, [searchStr, searchData, allData]);

  const isLoading = isLoadingAll || isLoadingSearch;
  const products = currentData?.products || [];
  const total = currentData?.total ?? 0;

  const hasNext = !searchStr && skip + limit < total;
  const hasPrev = !searchStr && skip > 0;

  const from = products.length > 0 ? (searchStr ? 1 : skip + 1) : 0;
  const to = searchStr ? products.length : Math.min(skip + limit, total);

  const handleClearSearch = () => {
    setSearchStr("");
    setSkip(0);
  };

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

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("products.catalog")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder={t("products.searchPlaceholder")}
            value={searchStr}
            onChange={(e) => {
              setSearchStr(e.target.value);
              setSkip(0);
            }}
            sx={{ flexGrow: 1, minWidth: 300 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: searchStr && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClearSearch}
                      edge="end"
                      size="small"
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {!searchStr && (
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>{t("products.perPage")}</InputLabel>
              <Select
                value={limit}
                label={t("products.perPage")}
                onChange={(e) => {
                  setLimit(e.target.value as 30 | 50 | 70);
                  setSkip(0);
                }}
              >
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={70}>70</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      </Box>

      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {searchStr ? (
            <>
              {t("products.found")}: <strong>{products.length}</strong>{" "}
              {products.length === 1
                ? t("products.product")
                : t("products.products")}
            </>
          ) : (
            <>
              {t("products.showing")}:{" "}
              <strong>
                {from} - {to}
              </strong>{" "}
              {t("common.of")} <strong>{total}</strong>
            </>
          )}
        </Typography>

        {searchStr && (
          <Chip
            label={`${t("products.searchLabel")}: "${searchStr}"`}
            onDelete={handleClearSearch}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
      </Box>

      {!isLoading && products.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "text.secondary",
          }}
        >
          <Search sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
          <Typography variant="h6" gutterBottom>
            {searchStr ? t("products.notFound") : t("products.noProducts")}
          </Typography>
          <Typography variant="body2">
            {searchStr
              ? t("products.notFoundDescription", { query: searchStr })
              : t("products.noProductsDescription")}
          </Typography>
          {searchStr && (
            <Button
              variant="outlined"
              onClick={handleClearSearch}
              sx={{ mt: 2 }}
            >
              {t("products.clearSearch")}
            </Button>
          )}
        </Box>
      )}

      {products.length > 0 && (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`/products/${product.id}`}
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          minHeight: "3.5em",
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          minHeight: "4.5em",
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6" color="primary">
                          ${product.price}
                        </Typography>
                        {product.discountPercentage > 0 && (
                          <Chip
                            label={`-${product.discountPercentage}%`}
                            color="secondary"
                            size="small"
                          />
                        )}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          {!searchStr && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                disabled={!hasPrev}
                onClick={() => setSkip((prev) => prev - limit)}
              >
                ← {t("common.back")}
              </Button>

              <Typography variant="body2" color="text.secondary">
                {t("common.page")} {Math.floor(skip / limit) + 1}{" "}
                {t("common.of")} {Math.ceil(total / limit)}
              </Typography>

              <Button
                variant="contained"
                disabled={!hasNext}
                onClick={() => setSkip((prev) => prev + limit)}
              >
                {t("common.next")} →
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductsInfo;
