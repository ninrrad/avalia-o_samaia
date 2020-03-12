package br.com.samaiait.exception.errors_msg;

import java.util.ResourceBundle;

import br.com.samaiait.exception.SamaiaException.Error;
import br.com.samaiait.exception.SamaiaException.ErrorType;

public class ErrorMenssagesProvider {
	protected static final String ERROR_BUNDLE = ".errors";
	protected static final String BUNDLE_KEY_FORMAT = "%s+%s";
	
	protected final  ResourceBundle labels; 

	public ErrorMenssagesProvider() {
		labels = ResourceBundle.getBundle(getClass().getPackage().getName()+ERROR_BUNDLE);
	}
	
	public String getMessage(ErrorType tErro, Error error) {
		String ret = null;
		String key = String.format(BUNDLE_KEY_FORMAT, tErro,error);
		if(labels.containsKey(key)) {
			ret =labels.getString(key);
		}else {
			key = String.format(BUNDLE_KEY_FORMAT, tErro,Error.UNKNOWN_ERROR);
			ret =labels.getString(key);
		}
		return ret;
	}
}
