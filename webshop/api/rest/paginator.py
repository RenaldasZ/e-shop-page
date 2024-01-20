from rest_framework.pagination import PageNumberPagination, Response, OrderedDict

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_page_size(self, request):
        # Allow clients to set a custom page size using the 'page_size' query parameter
        page_size = request.query_params.get('page_size', None)
        if page_size:
            return int(page_size)
        return super().get_page_size(request)

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('current', self.page.number),
            ('page_size', self.page_size),
            ('results', data)
        ]))