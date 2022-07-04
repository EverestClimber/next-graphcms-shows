import { css } from "styled-components";

export const Select = ({ data, ...props }) => (
  <select
    css={css`
      font-size: 1.5rem;
      background-color: transparent;
      border-color: white;
      color: white;

      @media (min-width: 600px) {
        min-width: 100px;
      }

      @media (max-width: 375px) {
        max-width: 150px;
      }
    `}
    {...props}
  >
    {data.map(({ id, text }) => (
      <option key={id} value={text}>
        {text}
      </option>
    ))}
  </select>
);

export const SelectWithTitle = ({ title, ...props }) => (
  <div
    css={css`
      display: flex;
      align-items: center;

      span {
        margin-right: 1rem;
      }
    `}
  >
    <span>{title}</span>
    <Select {...props} />
  </div>
);
