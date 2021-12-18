import React from "react";
import styled from "styled-components";
import { DefaultInputValues, KaspaInputs } from "../constants/Kaspa";

interface KaspaInputProps {
  data: KaspaInputs;
  label: keyof KaspaInputs;
  setData: (newValue: KaspaInputs) => void;
  defaultData: DefaultInputValues | null;
  setDefaultData: (key: keyof KaspaInputs, value: number | undefined) => void;
  className?: string;
}

const KaspaInput: React.FC<KaspaInputProps> = ({
  data,
  label,
  setData,
  className,
  defaultData,
  setDefaultData,
}) => {
  return (
    <Wrapper className={className}>
      <Title className="mb-0 text-dark">{data[label].title}</Title>
      {label && <p className="mb-0 text-muted">{data[label].label}</p>}
      <div className="d-flex">
        <NumberInput
          className={"w-100 mt-1"}
          type="text"
          placeholder=" *"
          value={data[label].value}
          onChange={(e) => {
            (!isNaN(Number(e.target.value)) || e.target.value === "-") &&
              setData({
                ...data,
                [label]: {
                  ...data[label],
                  value: e.target.value !== "-" ? e.target.value : undefined,
                },
              });
          }}
        />
        <NumberInputDefault
          className={"mt-1 ms-1 flex-shrink-1"}
          type="text"
          tabIndex={-1}
          placeholder="default"
          value={(defaultData && defaultData[label]) || undefined}
          onChange={(e) => {
            !isNaN(Number(e.target.value)) &&
              setDefaultData(label, Number(e.target.value));
          }}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  input:not([value=""]) {
    border-bottom: 2px solid #c4c4c4;
  }
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const NumberInput = styled.input`
  border-radius: 0;
  padding-bottom: 5px;
  border: none;
  outline: none;
  border-bottom: 2px solid #dbe3ef;

  :focus-visible,
  :focus {
    border-radius: 0;
    /* border: none !important; */
    border-bottom: 2px solid #343a40 !important;
  }

  .isEmpty {
    border-bottom: 2px solid red;
  }

  /* #a0a0a0 */
`;

const NumberInputDefault = styled(NumberInput)`
  width: 100px;
`;

export default React.memo(KaspaInput);