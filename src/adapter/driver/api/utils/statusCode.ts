export const StatusCode = {
    ok: 200,
    created: 201,
    noContent: 204,
    movedPermanently: 301,
    found: 302,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    unsupportedMedia: 415,
    unprocessableEntity: 422,
    serverError: 500,
    badGateway: 502,
} as const;
