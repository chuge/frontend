http://react-china.org/t/react/2674

	(function() {
		var zoomCalculated

		function resizeZoom(target) {
			var doc = target.contentDocument,
				body = doc.body,
				$html = $(doc).find('html'),
				iframeWidth = Math.min(body.clientWidth, body.scrollWidth, body.offsetWidth),
				maxiumnIframeWidth = Math.max(body.clientWidth, body.scrollWidth, body.offsetWidth),
				zoomPercentile = iframeWidth / maxiumnIframeWidth,
				isNeedCalZoom = parseInt($html.css('zoom') * 10) !== parseInt(zoomPercentile * 10);

			$html.css('-webkit-text-size-adjust', 'inherit');

			if (isNeedCalZoom || (!!zoomCalculated && zoomCalculated !== zoomPercentile)) {
				// $html.css('zoom', zoomPercentile);

				// $html.find('#db-content').css('zoom', 0.65);
				zoomCalculated = zoomPercentile;
			}
		}
	})();
