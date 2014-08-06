# Install requisites

```
mkvirtualenv env
easy_install -U setuptools
pip install nodeenv autobahn
nodeenv -p
npm install -g ionic cordova
npm install -g
bower install
```

# Setup

Not needed because it has already been setup.
```
crossbar init
```

# Run

In one screen run:
```
crossbar run
```

In other screen run:
```
ionic serve
```
