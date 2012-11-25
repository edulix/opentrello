Opentrello
----------

This is a simple Lists application using django-tastypie and backbone.js


Running locally
---------------

Preferably in a virtualenv, run the following commands:

    git clone https://edulix@github.com/edulix/opentrello.git
    cd opentrello/
    pip install -r requirements.txt
    ./manage.py syncdb --noinput
    ./manage.py runserver
