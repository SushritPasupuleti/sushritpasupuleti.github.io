build:
	@echo "Building..."
	@yarn build
	@echo "Build complete"

prepare: build
	@echo "Preparing for deployment..."
	@rm -rf ../assets
	@rm -rf ../_next
	@cp -r out/* ../
	@echo "Preparation complete"

