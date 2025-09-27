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
