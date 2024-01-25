import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  // 把排序的值放到 url 中，可以更好的获取，别人复制链接就是排序好的
  const [searchParams, setSearchPrams] = useSearchParams();

  // 拿到当前的值，方便渲染当前选中的样式
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  // 点击触发 url 地址更新
  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchPrams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={option.value === currentFilter ? 1 : 0}
          disabled={option.value === currentFilter ? 1 : 0}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
