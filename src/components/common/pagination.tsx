export const Pagination = ({
  pageInfo,
  currentPage,
  searchValue,
  sort,
  collection,
}: {
  pageInfo: any;
  currentPage: number;
  searchValue: string;
  sort: string;
  collection?: {
    title: string;
    collection: string;
  };
}) => {
  if (collection) {
    return (
      <div className="mt-6 flex items-center">
        <div className="flex-1">
          {pageInfo.hasPreviousPage ? (
            <a
              href={`?title=${collection.title}&collection=${collection.collection}&before=${pageInfo.startCursor}&page=${currentPage - 1}`}
              className="bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              ← Anterior
            </a>
          ) : (
            <span />
          )}
        </div>

        <span className="text-sm text-gray-600">Página {currentPage}</span>

        <div className="flex flex-1 justify-end">
          {pageInfo.hasNextPage ? (
            <a
              href={`?title=${collection.title}&collection=${collection.collection}&after=${pageInfo.endCursor}&page=${currentPage + 1}`}
              className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Siguiente →
            </a>
          ) : (
            <span />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex items-center">
      <div className="flex-1">
        {pageInfo.hasPreviousPage ? (
          <a
            href={`?q=${searchValue ?? ""}&sort=${sort ?? ""}&before=${
              pageInfo.startCursor
            }&page=${currentPage - 1}`}
            className="bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            ← Anterior
          </a>
        ) : (
          <span />
        )}
      </div>

      <span className="text-sm text-gray-600">Página {currentPage}</span>

      <div className="flex flex-1 justify-end">
        {pageInfo.hasNextPage ? (
          <a
            href={`?q=${searchValue ?? ""}&sort=${sort ?? ""}&after=${
              pageInfo.endCursor
            }&page=${currentPage + 1}`}
            className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Siguiente →
          </a>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
};

// import { useMemo } from "react";

// import { IProductFilter } from "@/types/product";

// const DOTS = "…";

// function usePaginationRange(
//   totalPages: number,
//   currentPage: number,
//   siblingCount: number,
// ) {
//   return useMemo(() => {
//     const totalNumbers = siblingCount * 2 + 5;
//     if (totalPages <= totalNumbers) {
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     }

//     const leftSibling = Math.max(currentPage - siblingCount, 1);
//     const rightSibling = Math.min(currentPage + siblingCount, totalPages);
//     const showLeftDots = leftSibling > 2;
//     const showRightDots = rightSibling < totalPages - 1;

//     if (!showLeftDots && showRightDots) {
//       const leftRange = Array.from(
//         { length: 3 + 2 * siblingCount },
//         (_, i) => i + 1,
//       );
//       return [...leftRange, DOTS, totalPages];
//     }

//     if (showLeftDots && !showRightDots) {
//       const start = totalPages - (3 + 2 * siblingCount) + 1;
//       const rightRange = Array.from(
//         { length: 3 + 2 * siblingCount },
//         (_, i) => start + i,
//       );
//       return [1, DOTS, ...rightRange];
//     }

//     const middleRange = Array.from(
//       { length: rightSibling - leftSibling + 1 },
//       (_, i) => leftSibling + i,
//     );
//     return [1, DOTS, ...middleRange, DOTS, totalPages];
//   }, [totalPages, currentPage, siblingCount]);
// }

// const Icon = {
//   First: () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
//       <path fill="currentColor" d="M18 7l-5 5l5 5V7zM6 7h2v10H6V7z" />
//     </svg>
//   ),
//   Prev: () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         fill="currentColor"
//         d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"
//       />
//     </svg>
//   ),
//   Next: () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         fill="currentColor"
//         d="M8.59 16.59L10 18l6-6l-6-6l-1.41 1.41L13.17 12z"
//       />
//     </svg>
//   ),
//   Last: () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
//       <path fill="currentColor" d="M6 17l5-5l-5-5v10zM16 7h2v10h-2V7z" />
//     </svg>
//   ),
// };

// export const Pagination = ({
//   loadingStore,
//   productsFilter,
//   pagination,
//   setPage,
//   currentPage,
// }: {
//   loadingStore: boolean;
//   productsFilter: IProductFilter[];
//   pagination: any;
//   setPage: (page: number) => void;
//   currentPage: number;
// }) => {
//   const totalPages = pagination?.pageCount ?? 1;

//   const range = usePaginationRange(totalPages, currentPage, 1);

//   if (loadingStore || totalPages <= 1) {
//     return null;
//   }

//   const pageSize = pagination?.pageSize ?? 8;
//   const totalItems =
//     typeof pagination?.total === "number"
//       ? pagination.total
//       : pagination?.pageCount
//         ? pagination.pageCount * pageSize
//         : (productsFilter?.length ?? 0);

//   const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
//   const end =
//     totalItems === 0
//       ? 0
//       : Math.min(start + (productsFilter?.length ?? 0) - 1, totalItems);

//   const go = (p: number) => {
//     if (p < 1 || p > totalPages || p === currentPage) return;
//     setPage(p);
//     try {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch {}
//   };

//   const base =
//     "inline-flex h-10 min-w-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors";
//   const subtle = "border text-slate-700 hover:bg-blue-300";
//   const muted = "border border-gray-200 cursor-not-allowed text-slate-400";
//   const active =
//     "bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold border-blue-800";

//   return (
//     <div className="mt-8 w-full">
//       {/* Barra “Mostrando X–Y de Z” */}
//       <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
//         <span>
//           Mostrando <strong>{start}</strong>
//           {" a "}
//           <strong>{end}</strong> de <strong>{totalItems}</strong>{" "}
//           {totalItems === 1 ? "producto" : "productos"}
//         </span>
//         <span className="hidden sm:inline">
//           Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
//         </span>
//       </div>

//       {/* Paginador */}
//       <nav
//         role="navigation"
//         aria-label="Paginación"
//         className="flex w-full items-center justify-center"
//       >
//         <div className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-2xl p-2 sm:px-3 sm:py-2">
//           {/* Móvil */}
//           <div className="flex w-full items-center justify-between sm:hidden">
//             <button
//               onClick={() => go(1)}
//               disabled={currentPage === 1}
//               aria-label="Primera página"
//               className={`${base} ${currentPage === 1 ? muted : subtle}`}
//               title="Primera"
//             >
//               <Icon.First />
//             </button>
//             <button
//               onClick={() => go(currentPage - 1)}
//               disabled={currentPage === 1}
//               aria-label="Página anterior"
//               className={`${base} ${currentPage === 1 ? muted : subtle}`}
//               title="Anterior"
//             >
//               <Icon.Prev />
//             </button>

//             <span className="text-sm text-slate-600 select-none">
//               {currentPage} / {totalPages}
//             </span>

//             <button
//               onClick={() => go(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               aria-label="Página siguiente"
//               className={`${base} ${currentPage === totalPages ? muted : subtle}`}
//               title="Siguiente"
//             >
//               <Icon.Next />
//             </button>
//             <button
//               onClick={() => go(totalPages)}
//               disabled={currentPage === totalPages}
//               aria-label="Última página"
//               className={`${base} ${currentPage === totalPages ? muted : subtle}`}
//               title="Última"
//             >
//               <Icon.Last />
//             </button>
//           </div>

//           {/* Desktop */}
//           <div className="hidden w-full items-center justify-center gap-2 sm:flex">
//             <button
//               onClick={() => go(1)}
//               disabled={currentPage === 1}
//               aria-label="Primera página"
//               className={`${base} ${currentPage === 1 ? muted : subtle}`}
//               title="Primera"
//             >
//               <Icon.First />
//             </button>
//             <button
//               onClick={() => go(currentPage - 1)}
//               disabled={currentPage === 1}
//               aria-label="Página anterior"
//               className={`${base} ${currentPage === 1 ? muted : subtle}`}
//               title="Anterior"
//             >
//               <Icon.Prev />
//             </button>

//             {range.map((item, idx) => {
//               if (item === DOTS) {
//                 return (
//                   <span
//                     key={`dots-${idx}`}
//                     className="inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-slate-400 select-none"
//                     aria-hidden="true"
//                   >
//                     …
//                   </span>
//                 );
//               }
//               const page = item as number;
//               const isActive = page === currentPage;
//               return (
//                 <button
//                   key={page}
//                   onClick={() => go(page)}
//                   aria-label={`Ir a la página ${page}`}
//                   aria-current={isActive ? "page" : undefined}
//                   className={`${base} ${isActive ? active : subtle}`}
//                 >
//                   {page}
//                 </button>
//               );
//             })}

//             <button
//               onClick={() => go(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               aria-label="Página siguiente"
//               className={`${base} ${currentPage === totalPages ? muted : subtle}`}
//               title="Siguiente"
//             >
//               <Icon.Next />
//             </button>
//             <button
//               onClick={() => go(totalPages)}
//               disabled={currentPage === totalPages}
//               aria-label="Última página"
//               className={`${base} ${currentPage === totalPages ? muted : subtle}`}
//               title="Última"
//             >
//               <Icon.Last />
//             </button>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };
