interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}: PaginationProps) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5; // Number of page buttons to show

    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - Math.floor(showPages / 2));
      const end = Math.min(totalPages, start + showPages - 1);

      // Adjust start if we're near the end
      if (end - start < showPages - 1) {
        start = Math.max(1, end - showPages + 1);
      }

      // Add first page and ellipsis if needed
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push("...");
        }
      }

      // Add page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis and last page if needed
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-4">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="px-3 py-2 rounded-lg bg-white/20 border border-black/30 text-black hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Previous page"
      >
        ←
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => (
        <span key={index}>
          {typeof page === "number" ? (
            <button
              onClick={() => onPageChange(page)}
              disabled={loading}
              className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                currentPage === page
                  ? "bg-[#85b146] text-white border-[#85b146]"
                  : "bg-white/20 border-black/30 text-black hover:bg-white/30"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ) : (
            <span className="px-3 py-2 text-gray-500">...</span>
          )}
        </span>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="px-3 py-2 rounded-lg bg-white/20 border border-black/30 text-black hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Next page"
      >
        →
      </button>

      {/* Page info */}
      <div className="ml-2 text-[13px] text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
