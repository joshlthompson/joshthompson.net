
SOURCES := $(shell find docs -name '*.md')
TARGETS := $(patsubst %.md,%.html,$(SOURCES))

STYLES := static/css/tufte-css/tufte.css \
	static/css/pandoc.css \
	static/css/pandoc-solarized.css \
	static/css/tufte-extra.css

TEMPLATES := templates/tufte.html5

.PHONY: all
all: $(TARGETS)

%.html: %.md $(TEMPLATES) $(STYLES)
	pandoc \
		--katex \
		--section-divs \
		--from markdown+tex_math_single_backslash \
		--filter pandoc-sidenote \
		--to html5+smart \
		--template=$(TEMPLATES) \
		$(foreach style,$(STYLES),--css $(notdir $(style))) \
		--output $@ \
		$<

.PHONY: clean
clean:
	rm -f $(TARGETS) 

