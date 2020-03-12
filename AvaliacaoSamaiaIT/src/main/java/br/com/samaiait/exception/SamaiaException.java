package br.com.samaiait.exception;

import java.io.Serializable;

import br.com.samaiait.exception.errors_msg.ErrorMenssagesProvider;
/** 
 * Classe que representa uma falha tratada pelo desenvolvedor
 * */
public class SamaiaException extends Exception implements Serializable{
	private static final long serialVersionUID = -1196523718720177271L;

	protected static final String TO_STRING_FMT = "%s(COD:%d - %s)";
	 
	public static enum ErrorType {
		PERSISTENCE_ERROR,
		USER_ERROR,
		BUSINESS_ERROR,
		INTEGRATION_ERROR
	}
	
	public static enum Error{
		UNKNOWN_ERROR,
		INVALID_PARAMETER,
		RESOURCE_NOT_FOUND,
		RESOURCE_DUPLICATED
	}
	
	protected static final ErrorMenssagesProvider EMP = new ErrorMenssagesProvider();
	
	protected final String 	userMessage;
	protected final long   	errorCode;
	protected final ErrorType errorType;
	protected final Error     error;
	
	public SamaiaException(ErrorType te, Error e) {
		this(te,e,null,"causa não informada");
	}
	
	public SamaiaException(ErrorType te,  Throwable cause) {
		this(te,getErroFromException(cause),cause,cause.getMessage());
	}
	
	
	public SamaiaException(ErrorType te, Error e, Throwable cause,String msg) {
		super(msg == null ? EMP.getMessage(te, e) : msg,cause);
		userMessage = EMP.getMessage(te, e);
		errorCode   = te.ordinal() & (e.ordinal() >> 16);
		errorType	= te;
		error		= e;
	}
	
	
	/** Mensagem enviada para o usuario referente a falha */
	public String getUserMessage() {
		return userMessage;
	}
	
	public long getErrorCode() {
		return errorCode;
	}
	
	@Override
	public String toString() {
		return String.format(TO_STRING_FMT, userMessage,errorCode,getMessage());
	}
	/** Metodo que analisa as menssagens e converte em constantes de erro*/
	public static Error getErroFromException(Throwable cause) {
		Throwable localCuase = cause;
		Error e =null;
		String messageRoot =null;
		
		while((localCuase = localCuase.getCause()) !=null) messageRoot= localCuase.getMessage();
		//TODO: Melhorar a rotina de indentificação de errors
		if(messageRoot.contains("duplicate key")) {
			e = Error.RESOURCE_DUPLICATED;
		}else if(messageRoot.contains("violates not-null constraint")) {
			e = Error.INVALID_PARAMETER;
		}else {
			e = Error.UNKNOWN_ERROR;
		}
		
		
		return e;
	}
	
	
}
