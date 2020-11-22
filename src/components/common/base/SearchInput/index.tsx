import styled from "styled-components";

import Input from "../Input";

const SearchInput = styled(Input)`
  padding-left: calc(1.71429em + 0.875rem);
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23676767' viewBox='0 0 30 30'%3E%3Cpath d='M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.947 9.947 0 006.322-2.264l5.971 5.971a1 1 0 101.414-1.414l-5.97-5.97A9.947 9.947 0 0023 13c0-5.511-4.489-10-10-10zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left calc(0.42857em + 0.21875rem) center;
  background-size: calc(0.85714em + 0.4375rem) calc(0.85714em + 0.4375rem);
`;

export default SearchInput;
