<template>
	<div
		@click.prevent="$emit('clickBackdrop', true)"
		class="appBackdrop">
		<div
			@click.stop
			class="appBackdrop__wrapper">
			<slot/>
		</div>
	</div>
</template>

<style lang="scss">
.appBackdrop {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1100;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.5);

	&__wrapper {
		min-width: 300px;
		max-width: 100%;
		max-height: 100%;
		padding: 16px;
		overflow: visible;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	&__wrapper::-webkit-scrollbar {
		display: none;
	}

	&--enter-active,
	&--leave-active {
		transition: opacity 300ms ease-in-out;
	}

	&--enter,
	&--leave-to {
		opacity: 0;
	}

	.manageAddress {
		width: 400px;
		max-width: 100%;

		&__form__wrapper,
		&__lists {
			max-height: 400px;
			overflow: hidden;
			overflow-y: auto;
		}
	}
}
</style>
