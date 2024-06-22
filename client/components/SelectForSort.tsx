import styles from "@/styles/form.module.css";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import { POST_ORDERS } from "@/costants/posts";

interface Props {
  handleChange: (value: string) => void;
}

const StyledChevronDownIcon = styled(ChevronDownIcon)`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);

  width: 20px;
  height: auto;

  // Allow clicks to pass through to the select box
  pointer-events: none;
`;

const SelectForSort = ({ handleChange }: Props) => {
  const [selectedSortOrder, setSelectedSortOrder] = useState(
    POST_ORDERS[0].value
  );

  return (
    <div className="relative w-fit ">
      <select
        value={selectedSortOrder}
        onChange={(e) => {
          setSelectedSortOrder(e.target.value);
          handleChange(e.target.value);
        }}
        className={`appearance-none w-fit min-w-[120px] text-base border-gray-600 cursor-pointer outline-none ${styles.item_frame}`}
      >
        {POST_ORDERS.map((order) => (
          <option key={order.value} value={order.value}>
            {order.label}
          </option>
        ))}
      </select>
      <StyledChevronDownIcon />
    </div>
  );
};

export default SelectForSort;
