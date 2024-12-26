# Define source files
SOURCES := $(wildcard docs/*.md)

# Convert markdown paths to html paths
TARGETS := $(patsubst %.md,%.html,$(SOURCES))

# Define stylesheet paths for pandoc
BUILD_STYLES := static/css/tufte-css/tufte.css \
    static/css/pandoc.css \
    static/css/pandoc-solarized.css \
    static/css/tufte-extra.css

# BDefine stylesheet paths for browsers
CSS_PATHS := ../../static/css/tufte-css/tufte.css \
    ../../static/css/pandoc.css \
    ../../static/css/pandoc-solarized.css \
    ../../static/css/tufte-extra.css

.PHONY: all
all: $(TARGETS)

# Rule to build HTML files
%.html: %.md templates/tufte.html5 $(BUILD_STYLES)
	pandoc \
	--katex \
	--section-divs \
	--from markdown+tex_math_single_backslash \
	--filter pandoc-sidenote \
	--to html5+smart \
	--template=templates/tufte \
	$(foreach style,$(CSS_PATHS),--css $(style)) \
	--output $@ \
	$<

.PHONY: clean
clean:
	rm -f $(TARGETS)