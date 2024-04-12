import React, { useCallback, useEffect, useMemo } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { displayErrorToast } from "../config/alert";
import ProductApi from "../api/product";
import { debounce, getToken } from "../config/helper";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import UpdateProductModal from "../components/UpdateProductModal";
import Products from "../components/Products";
import Signup from "../components/Signup";
import CreateProduct from "../components/CreateProduct";
const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [sources, setSources] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [show, setShow] = React.useState(null);
  const [updateData, setUpdateData] = React.useState({});
  const loggedUser = useMemo(
    () => JSON.parse(localStorage.getItem("user")),
    []
  );
  const [CategoryFilter, setCategoryFilter] = React.useState([]);
  const [sourceFilter, setSourceFilter] = React.useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/sign-in";
    }
  }, []);

  useEffect(() => {
    getALlProducts(search);
  }, [CategoryFilter, sourceFilter]);
  const getALlProducts = (searchValue) => {
    ProductApi.getProducts(
      getToken(),
      searchValue,
      CategoryFilter,
      sourceFilter
    )
      .then((res) => {
        setProducts(res?.data?.products);
        setSources(res?.data?.sources);
        setCategories(res?.data?.categories);
        console.log(res?.data?.products);
      })
      .catch((err) => {
        displayErrorToast(err.response.data.error.message);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/sign-in";
  };
  const debounceSerch = useCallback(debounce(getALlProducts, 500), []);
  const handleSearch = (seachString) => {
    setSearch(seachString);
    debounceSerch(seachString);
  };
  return (
    <div className="mt-4 container">
      <UpdateProductModal
        getALlProducts={getALlProducts}
        updateData={updateData}
        show={show}
        setShow={setShow}
      />
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="Products">
          <Row>
            <Col xs={4}></Col>
            <Col xs={3}>
              <p>Search</p>
              <hr />
              <div className="d-flex mt-5">
                <input
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="search product or sku here"
                  className="form-control mx-1"
                  type="text"
                />
              </div>
            </Col>
            <Col xs={4}>
              <p>Filters</p>
              <hr />
              <Row>
                <Col>
                  <h6 className="text-start" htmlFor="">
                    Source Filter :
                  </h6>
                  <Select
                    className="mt-1"
                    onChange={(e) => setSourceFilter(e.value)}
                    options={sources?.map((s) => ({
                      value: s,
                      label: s,
                    }))}
                  />
                </Col>
                <Col>
                  <h6 className="text-start" htmlFor="">
                    Category Filter :
                  </h6>
                  <Select
                    onChange={(e) =>
                      setCategoryFilter(() => e?.map((cat) => cat.value))
                    }
                    className="mt-1"
                    isMulti
                    options={categories?.map((s) => ({
                      value: s,
                      label: s,
                    }))}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Button variant="danger" onClick={handleLogOut}>
                Log Out
              </Button>
            </Col>
          </Row>
          <Products
            setUpdateData={setUpdateData}
            products={products}
            setShow={setShow}
          />
        </Tab>
        {loggedUser?.role === "admin" && (
          <Tab className="mt-2" eventKey="createUser" title="Crete user">
            <Signup />
          </Tab>
        )}

        <Tab eventKey="createProduct" title="Create Product">
          <CreateProduct getALlProducts={getALlProducts} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Home;
