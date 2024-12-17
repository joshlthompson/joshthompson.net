SOURCES := $(wildcard docs/*.md)
TARGETS := $(patsubst %.md,%.html,$(SOURCES))
STYLES := static/css/pandoc.css static/css/style.css static/css/pandoc-solarized.css
.PHONY: all
all: $(TARGETS)

%.html: %.md templates/tufte.html5 $(STYLES)
	pandoc \
		--katex \
		--section-divs \
		--from markdown+tex_math_single_backslash \
		--filter pandoc-sidenote \
		--to html5+smart \
		--template=tufte.html5 \
		$(foreach style,$(STYLES),--css $(style)) \
		--output $@ \
		$<

.PHONY: clean
clean:
	rm -f $(TARGETS)
