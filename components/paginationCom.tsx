import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  totalPages: number;
  page: number;
  category: string;
};

export function PaginationCom({ totalPages, page, category }: Props) {
  const siblingCount = 1;
  const startPage = Math.max(2, page - siblingCount);
  const endPage = Math.min(totalPages - 1, page + siblingCount);
  const previousPage = page > 1 ? page - 1 : page;
  const nextPage = page < totalPages ? page + 1 : page;

  const renderPageNumbers = () => {
    const items = [];
    if (totalPages === 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={`/category/${category}?page=1`}>1</PaginationLink>
        </PaginationItem>
      );
    } else if (totalPages === 2) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={`/category/${category}?page=1`}>1</PaginationLink>
        </PaginationItem>
      );
      items.push(
        <PaginationItem key={2}>
          <PaginationLink href={`/category/${category}?page=2`}>2</PaginationLink>
        </PaginationItem>
      );
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={`/category/${category}?page=1`}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={`/category/${category}?page=${i}`}
              isActive={i === page}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href={`/category/${category}?page=${totalPages}`}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`/category/${category}?page=${previousPage}`} />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext href={`/category/${category}?page=${nextPage}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}